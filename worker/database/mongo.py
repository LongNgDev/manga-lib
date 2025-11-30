
from pymongo import MongoClient, DESCENDING
from pymongo.errors import ConnectionFailure
import dotenv
# from pymongo.errors

envPath = dotenv.find_dotenv()
dbURI = dotenv.dotenv_values(envPath).get("MONGO_URI")

class MongoDB():

  def __init__(self):
    self.db_uri = dbURI or "mongodb://admin:admin@mongo:27017/manga-lib?authSource=admin" 
    self.client = None
    self.__database = None
    self.__collection = None
    
  # Connect to MongoDB
  def connect(self):
    if self.db_uri is None:
      print("Cannot connect without database URI!")
      return
  
    if self.client is not None or self.__database is not None or self.__collection is not None:
      return

    try:
      # Connect to client and test connection using ping
      print("Establishing connection... ", end="")
      self.client = MongoClient(self.db_uri)
      print("Done")
      
      print("Connecting to database... ", end="")
      self.__database = self.client.get_database("manga-lib")
      print("Done")
      

      print("Connecting to collection... ", end="")
      self.__collection = self.__database.get_collection("raw_metadata")
      print("Done")

      if self.client.admin.command("ping"):
        print("Database connected!", end="\n\n")
    
    except ConnectionFailure as e:
      print(f"Connected failed! Error: {e}")


  # Check if the connection is successful? Re-connect call when need
  def is_connected(self):
    if self.client is None:
      self.connect()
      return False
    
    if  self.__database is None or self.__collection is None:
      print("Reconnecting to database!")
      self.connect()
      return False
    
    return True

  # SAVE: add or update item from database, using upsert
  def save(self, data:dict):
    if self.__collection is None:
      print("Collection not found!")
      self.connect()
      return
    
    query_filter = {"id": data["id"]}
    update_operation = {"$set": data}
    
    # Perform update or add to database using upsert
    res = self.__collection.update_one(query_filter, update_operation, upsert = True)
    print(res)
    
    return res

  # RETRIEVE: return 

  # RETRIEVE: return the total item in collections
  def get_total(self) -> int | bool:
    if self.__collection is None:
      self.is_connected()
      return False
    
    res = self.__collection.count_documents({})
    return res

  
  # RETRIEVE: return the latest uploaded manga with limit amount
  def get_latest(self, limit):
    if self.__collection is None:
      self.is_connected()
      return False
    
    res = self.__collection.find().sort("latestUploadedChapter", DESCENDING).limit(limit).to_list()

    if len(res) == 0:
      return
    
    return res
  
  # RETRIEVE: return all the manga from the database
  def get_all(self):
    if self.__collection is None:
      self.is_connected()
      return False

    return self.__collection.find().to_list()





if __name__ == "__main__":
  client = MongoDB()

  client.connect()
  print(dbURI)
