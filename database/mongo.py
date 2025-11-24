
from pymongo import MongoClient
# from pymongo.errors


class MongoDB():

  def __init__(self):
    self.db_uri = "mongodb://127.0.0.1:27017/"
    self.client = None
    self.__database = None
    self.__collection = None
    
    return
  
  # Connect to MongoDB
  def connect(self):
    if self.db_uri is None:
      print("Cannot connect without database URI!")
      return
    
    # Connect to client and test connection using ping
    self.client = MongoClient(self.db_uri)
    if self.client.admin.command("ping"):
      print("Database connected!")


    self.__database = self.client.get_database("manga-lib")
    self.__collection = self.__database.get_collection("raw_metadata")

  # Check if the connection is successful? Re-connect call when need
  def is_connected(self):
    if self.client is None or self.__database is None or self.__collection is None:
      print("Reconnecting to database!")
      self.connect()
      return False
    
    return True

  # SAVE: add or update item from database, using upsert
  def save(self, data:dict):
    if self.__collection is None or not self.is_connected():
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






if __name__ == "__main__":
  client = MongoDB()

  client.connect()
