import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# get your uri from .env file
uri = "mongodb+srv://ShelAlma:ShelAlma@cluster0.3whqy.mongodb.net"


# create cluster
cluster = MongoClient(uri, server_api=ServerApi('1'))

# get all dbs and collections that needed
mydatabase = cluster['What_Is_In_My_Box']
users_collection = mydatabase['Users']
recipes_collection = mydatabase['Recipes']

print("Collections in database:", mydatabase.list_collection_names())

