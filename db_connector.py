import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# get your uri from .env file
uri = "mongodb+srv://ShelAlma:ShelAlma@cluster0.3whqy.mongodb.net"


# create cluster
cluster = MongoClient(uri, server_api=ServerApi('1'))

# get all dbs and collections that needed
mydatabase = cluster['mydatabase']
# customers_col = mydatabase['customers']
#
#
# # create all necessary functions
# def get_list_of_customers():
#     return list(customers_col.find())
#
#
# def insert_customer(customer_dict):
#     customers_col.insert_one(customer_dict)

# ...


