from flask import Flask, session, redirect, url_for, render_template, jsonify
import os
from db_connector import users_collection, recipes_collection, mydatabase
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://ShelAlma:ShelAlma@cluster0.3whqy.mongodb.net')
db = client["What_Is_In_My_Box"]
users_collection = db["Users"]
recipes_collection = db["Recipes"]


def print_database_contents():
    collections = mydatabase.list_collection_names()
    print("\n Collections in the Database:")
    for collection in collections:
        print(f"   - {collection}")

    print("\n Users Collection:")
    users = list(users_collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id`
    if users:
        for user in users:
            print(user)
    else:
        print(" No users found.")

    print("\n Recipes Collection:")
    recipes = list(recipes_collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id`
    if recipes:
        for recipe in recipes:
            print(recipe)
    else:
        print(" No recipes found.")

print("\n Database content printed successfully!\n")

if __name__ == '__main__':
 print_database_contents()
