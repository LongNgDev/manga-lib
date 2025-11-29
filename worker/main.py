from fetcher.fetcherClient import Fetcher
from database.mongo import MongoDB


# Initialise fetcher and database
def init():
  db = MongoDB()
  db.connect()
  fetcher = Fetcher(db=db)
  return db, fetcher

def main():
  db, fetcher = init()


  try:

    # Main loop
    while(True):
      # Up-to-date with latest manga updates
      # Fetch all if the database is empty
      if db.get_total() <= 0:
        print(f"Initialising database by fetching all the data from source.")
        fetcher.fetchAll()
        print("Fetch All Done!")
      # Fetch 100 latest updated manga
      else:
        print(f"Updated latest manga updates.")
        fetcher.fetchLatest()
        print("Fetch Latest Done!")
    
  except KeyboardInterrupt:
    print("\nKeyboardInterrupt caught! Exiting gracefully.")
  
  except Exception as e:
    print(f"Error! {e}")
    return

main()
