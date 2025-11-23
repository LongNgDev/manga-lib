
import requests
from database.mongo import MongoDB

""" 

This is the main fetcher for the manga library.

Features:
- get all the raw data from mangaDex
 """


class Fetcher():

  def __init__(self, url:str = "https://api.mangadex.org"):
    self.base_url = url
    self.__LIMIT = 100 # Set limit of the response data [0,100]
    self.__offset = 0 # Set offset from the first item of the list
    self.__exclude_tags = ["5920b825-4181-4a17-beeb-9918b0ff7a30", "65761a2a-415e-47f3-bef2-a9dababba7a6", "2bd2e8d0-f146-434a-9b51-fc9ff2c5fe6a"]
    self.__expansion_opts = ["manga", "cover_art", "author", "artist", "tag", "creator"]
    self.MAX_ITEM = 10000 # Server limit at 10000
    self.mongo_client = MongoDB()
    self.mongo_client.connect()



  def fetch_all(self):
    if self.base_url is None: return

    # This lock only let this function run only once
    if not self.mongo_client.get_total() or self.mongo_client.get_total() > 0:
      return
    

    while(True):
      
      try:
        res = requests.get(f"{self.base_url}/manga", {
          "limit": self.__LIMIT,
          "offset": self.__offset,
          "excludedTags[]": self.__exclude_tags,
          "includes[]": self.__expansion_opts,
          "availableTranslatedLanguage[]": ["en", "vi"], 
          "hasAvailableChapters": "1", # True
        })

        # Handle bad response
        if not res.ok:
          print(f"Fetch raw data failed! Error msg: {res.json().get("errors")[0]}")
          break
        
        # Exhaust the loop while reach the end of the list
        if self.offset > self.MAX_ITEM:
          break

        self.offset += self.__LIMIT # Move cursor to next page

        # Extract raw data list from the response
        raw_data = res.json().get("data")


        # SAVE manga to database
        for manga in raw_data:
          self.mongo_client.save(manga)

      except Exception as e:
        print(f"Errors: {e}")

    
    return


if __name__ == "__main__":
  fetcher = Fetcher()


  fetcher.fetch_all()