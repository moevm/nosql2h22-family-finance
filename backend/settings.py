from dotenv import load_dotenv
from pymongo import MongoClient
from flask import Flask
load_dotenv()

client = MongoClient(port=27017, uuidRepresentation='standard')
db = client.family_finance
tests = db.tests
app = Flask(__name__)
