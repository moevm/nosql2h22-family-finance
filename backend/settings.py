from dotenv import load_dotenv
from pymongo import MongoClient
from flask import Flask
from flask_cors import CORS

load_dotenv()

client = MongoClient(port=27017, uuidRepresentation='standard')
db = client.family_finance
tests = db.tests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
