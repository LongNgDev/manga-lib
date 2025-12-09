from fetcher.fetcherClient import Fetcher
from database.mongo import MongoDB
import time


# Initialise fetcher and database
def init():
  db = MongoDB()
  db.connect()
  fetcher = Fetcher(db=db)
  return db, fetcher

# Sleep with progress bar
def progress_sleep(seconds):
    for i in range(seconds):
        bar = "#" * (i * 20 // seconds)
        print(f"\r[{bar:<20}] {i+1}/{seconds}s", end="", flush=True)
        time.sleep(1)
    print()


def main():
  db, fetcher = init()

  try:
    # Main loop
    while(True):

      try:

        # Up-to-date with latest manga updates
        # Fetch all if the database is empty
        if db.get_total() <= 0:
          print(f"Initialising database by fetching all the data from source.")
          fetcher.fetchAll()
          print("Fetch All Done!", end="\n\n")
        # Fetch 100 latest updated manga
        else:
          fetcher.fetchLatest()
          print("Fetch Latest Done!", end="\n\n")
          

      except Exception as err:
        print({"status": 500, "err" : err})
      finally:
        print("Sleep for 300s(5 mins) ... \n\n")
        progress_sleep(300)
    
  except KeyboardInterrupt:
    print("\nKeyboardInterrupt caught! Exiting gracefully.")
    return
  
  except Exception as e:
    print(f"Error! {e}")
    return


main()