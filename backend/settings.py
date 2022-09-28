from dotenv import load_dotenv
from pymongo import MongoClient
load_dotenv()

client = MongoClient(port=27017)
db = client.family_finance
tests = db.tests
