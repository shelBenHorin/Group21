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
users_collection = mydatabase['Users']
recipes_collection = mydatabase['Recipes']


@app.route('/users')
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))  # Fetch all users, exclude `_id`
    return render_template('users.html', users=users)

@app.route('/recipes')
def get_recipes():
    recipes = list(recipes_collection.find({}, {"_id": 0}))  # Fetch all recipes
    return render_template('recipes.html', recipes=recipes)
# # create all necessary functions
# def get_list_of_customers():
#     return list(customers_col.find())
#
#
# def insert_customer(customer_dict):
#     customers_col.insert_one(customer_dict)

# ...


