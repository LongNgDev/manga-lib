import requests
from database.mongo import MongoDB
from datetime import datetime
import pytz
import json

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
          latestChapterId = manga["attributes"]["latestUploadedChapter"]
          manga["attributes"]["latestUploadedChapter"] = self.__fetchLatestUploadedChapter(latestChapterId)
          self.mongo_client.save(manga)

      except Exception as e:
        print(f"Errors: {e}")

    self.__offset = 0
    
  

  def fetchLatest(self):
    if self.base_url is None: return

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
      
      if not res.ok:
          print(f"Fetch raw data failed! Error msg: {res.json().get("errors")[0]}")
          raise Exception ({"err": res.raise_for_status()})
      
      # Extract raw data list from the response
      raw_data = res.json().get("data")

      # SAVE manga to database
      for manga in raw_data:
        latestChapterId = manga["attributes"]["latestUploadedChapter"] # Extract latest chapter ID
        manga["attributes"]["latestUploadedChapter"] = self.__fetchLatestUploadedChapter(latestChapterId) # Assign date to this key
        self.mongo_client.save(manga)

    except Exception as err:
      print(err)

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
      
      data = res.json().get("data").get("attributes").get("publishAt") # Extract publish date from the chapter data 
      utc = datetime.fromisoformat(data)
      publishedAt = utc.astimezone(pytz.timezone("Australia/Melbourne")).isoformat()
      return publishedAt
    
    except Exception as e:
      print(e)
      return None
    
  def proccessLatestUploadedChapter(self):
    data = self.mongo_client.get_all()
    
    if not data: return
    
    for manga in data:
      latestChapterId = manga["attributes"]["latestUploadedChapter"]

      if latestChapterId is None: continue
      dateFormat = self.__fetchLatestUploadedChapter(latestChapterId)

      if dateFormat is None: continue
      manga["attributes"]["latestUploadedChapter"] = dateFormat
      print(latestChapterId, manga)
      self.mongo_client.save(manga)
      return
    



if __name__ == "__main__":
  fetcher = Fetcher()


  # fetcher.fetchAll())
  fetcher.fetchLatest()
