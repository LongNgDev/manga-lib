import requests
from database.mongo import MongoDB
from datetime import datetime, timezone
import pytz
import time

""" 

This is the main fetcher for the manga library.

Features:
- get all the raw data from mangaDex
 """


class Fetcher():

  def __init__(self, url:str = "https://api.mangadex.org", db: MongoDB = MongoDB()):
    self.base_url = url
    self.__limit = 100 # Set limit of the response data [0,100]
    self.__offset = 0 # Set offset from the first item of the list
    self.__exclude_tags = ["5920b825-4181-4a17-beeb-9918b0ff7a30", "65761a2a-415e-47f3-bef2-a9dababba7a6", "2bd2e8d0-f146-434a-9b51-fc9ff2c5fe6a"]
    self.__expansion_opts = ["manga", "cover_art", "author", "artist", "tag", "creator"]
    self.MAX_ITEM = 10000 # Server limit at 10000
    self.mongo_client = db


  
  def fetchAll(self):
    if self.base_url is None: return

    # This lock only let this function run only once
    if self.mongo_client.get_total() > 0:
      return

    try:
      while(True):
        try:
          res = requests.get(f"{self.base_url}/manga", {
            "limit": self.__limit,
            "offset": self.__offset,
            "excludedTags[]": self.__exclude_tags,
            "includes[]": self.__expansion_opts,
            "availableTranslatedLanguage[]": ["en", "vi"],
            "order[latestUploadedChapter]":"desc",
            # "hasAvailableChapters": "1", # True
          }, timeout=10)

          # Handle bad response
          if not res.ok:
            print(f"Fetch raw data failed! Error msg: {res.json().get("errors")[0]}")
            break
          
          # Exhaust the loop while reach the end of the list
          if self.__offset > self.MAX_ITEM:
            print("Limit reached!")
            break

          # Move cursor to next page
          self.__offset += self.__limit 

          # Extract raw data list from the response
          raw_data = res.json().get("data")

          # SAVE manga to database
          for manga in raw_data:
            latestChapterId = manga["attributes"]["latestUploadedChapter"] # Extract latest chapter ID
            getChapterId = self.mongo_client.get_latestChapterId(manga["id"])

            # Only fetch if the chapter id is different
            if latestChapterId == getChapterId: return

            manga["attributes"]["latestUploadedChapterTimeStamp"] = self.__fetchLatestUploadedChapter(latestChapterId) # Assign date to this key
            print(manga["attributes"]["title"], manga["attributes"]["latestUploadedChapterTimeStamp"])
            
            self.mongo_client.save(manga) # Save to the database

        except Exception as e:
          print(f"Errors: {e}")
        
        finally:
          time.sleep(60)
    except Exception as e:
      print(f"Errors: {e}")
      return    
    finally:
      self.__offset = 0
  

  def fetchLatest(self):
    if self.base_url is None: return
    self.__offset = 0

    try:
      print(f"Fetching latest updates with (limit: {self.__limit}, offset: {self.__offset})")
      res = requests.get(f"{self.base_url}/manga", {
          "limit": self.__limit,
          "offset": self.__offset,
          "excludedTags[]": self.__exclude_tags,
          "includes[]": self.__expansion_opts,
          "availableTranslatedLanguage[]": ["en", "vi"],
          "order[latestUploadedChapter]":"desc",
          # "hasAvailableChapters": "1", # True
        }, timeout=10)
      
      if not res.ok:
          print(f"Fetch raw data failed! Error msg: {res.json().get("errors")[0]}")
          raise Exception ({"err": res.raise_for_status()})
      
      # Extract raw data list from the response
      raw_data = res.json().get("data")

      # SAVE manga to database
      for manga in raw_data:
        latestChapterId = manga["attributes"]["latestUploadedChapter"] # Extract latest chapter ID
        getChapterId = self.mongo_client.get_latestChapterId(manga["id"])

        # Only fetch if the chapter id is different
        if latestChapterId == getChapterId: 
          print(f"Manga: {manga["attributes"]["title"]} is already updated.")
          continue

        # Assign date to this key
        manga["attributes"]["latestUploadedChapterTimeStamp"] = self.__fetchLatestUploadedChapter(latestChapterId) 
        
        print(manga["attributes"]["title"], manga["attributes"]["latestUploadedChapterTimeStamp"])
        
        self.mongo_client.save(manga) # Save to the database

    except Exception as err:
      print(err)
      return

    finally:
      return

  # Return an exact date of the latest uploaded chapter by tracking publishAt values.
  def __fetchLatestUploadedChapter(self, id:str):
    if not id: return

    try:
      # Getting info about chapter from mangaDex
      res = requests.get(f"https://api.mangadex.org/chapter/{id}", timeout=10)
      if not res.ok:
        raise Exception({"status":"500", "msg": res})
      
      updatedAt = res.json().get("data").get("attributes").get("updatedAt") # Extract publish date from the chapter data 
      # updatedAtMelbourneTimezone = datetime.fromisoformat(updatedAt).astimezone(pytz.timezone("Australia/Melbourne")).isoformat()
      currentUTC = datetime.now(timezone.utc).isoformat()

      # Check if the publish date is validated
      if updatedAt > currentUTC:
        raise Exception({"status": 500, "msg": "Publish date is far from current time!"}) 
      
      return updatedAt
    
    except Exception as e:
      print(e)
      return None

  def 


if __name__ == "__main__":
  fetcher = Fetcher()


  # fetcher.fetchAll())
  fetcher.fetchLatest() 
  # res = fetcher.fetchLatestUploadedChapter("d37be610-0a56-48c6-986e-637f4b3dee62")
  # print(res)