
from pymongo import MongoClient

class MongoDB():

  def __init__(self):
    self.db_uri = "mongodb://127.0.0.1:27017/"
    self.client = None
    self.database = None
    self.collection = None
    
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


    self.database = self.client.get_database("manga-lib")
    self.collection = self.database.get_collection("raw_metadata")

  # Check if the connection is successful? Re-connect call when need
  def is_connected(self):
    if self.client is None or self.database is None or self.collection is None:
      print("Reconnecting to database!")
      self.connect()
      return False
    
    return True

  # SAVE: add or update item from database
  def save(self, data:dict):
    if self.collection is None or not self.is_connected():
      return
    
    query_filter = {"id": data["id"]}
    update_operation = {"$set": data}
    
    res = self.collection.update_one(query_filter, update_operation, upsert = True)
    print(res)
    
    return res




if __name__ == "__main__":
  client = MongoDB()

  client.connect()
