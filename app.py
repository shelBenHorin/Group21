from flask import Flask, session, redirect, url_for, render_template, jsonify, request
import os
from werkzeug.utils import secure_filename
from datetime import datetime
from db_connector import users_collection, recipes_collection
from datetime import datetime
from analyzeDB import print_database_contents

template_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'pages')

app = Flask(__name__, template_folder=template_dir, static_folder=template_dir)

@app.route('/')
def defult():
    return render_template('login/templates/login.html')

@app.route('/feed')
def feed():
    return render_template('feed/templates/feed.html')

@app.route('/login')
def login():
    return render_template('login/templates/login.html')


@app.route('/post')
def post():
    return render_template('post/templates/post.html')

@app.route('/recipe')
def recipe():
    return render_template('recipe/templates/recipe.html')


# @app.route('/recipe/:id')
# def recipe():
#     id = request.args.get('id')
#     receipe = find_receipe(id)
#     return render_template('recipe.html', receipe=receipe)


# @app.route('/recipe', methods=['POST'])
# def create_recipe():
#     params = request.form.to_dict()
#     create_receipe_in_mongo(params)
#     return render_template('recipe.html', receipe=receipe)


@app.route('/profile')
def profile():
    return render_template('profile/templates/profile.html')

@app.route('/search')
def search():
    return render_template('search/templates/search.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup_page():
    return render_template('signup/templates/signup.html')


@app.route('/users')
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))  # Fetch all users, exclude `_id`
    return render_template('users.html', users=users)

@app.route('/recipes')
def get_recipes():
    recipes = list(recipes_collection.find({}, {"_id": 0}))  # Fetch all recipes
    return render_template('recipes.html', recipes=recipes)



@app.route("/recipe/<recipe_id>")
def recipe_page(recipe_id):
    # Try to fetch the recipe from the database
    recipe = recipes_collection.find_one({"_id": recipe_id})

    # Debugging: Print the result in console
    print("Queried Recipe:", recipe)

    # Handle case where the recipe is not found
    if not recipe:
        return "Recipe not found", 404

    # Ensure the correct template path
    return render_template('recipe/templates/recipe.html', recipe=recipe)


@app.route('/profile/<username>')
def user_profile(username):
    user = users_collection.find_one({"username": username}, {"_id": 0})  # Exclude _id for clean output

    if not user:
        return "User not found", 404

    return render_template('profile/templates/profile.html', user=user)


@app.route('/recipe/<image_name>')
def recipe_page_from_profile(image_name):
    recipe = recipes_collection.find_one({"image_url": image_name}, {"_id": 0})

    if not recipe:
        return "Recipe not found", 404

    return render_template('recipe/templates/recipe.html', recipe=recipe)

#---------queries-------------

#Query 1: Top 2 users who uploaded the most recipes
@app.route('/api/top_users')
def get_top_users():

        top_users = list(recipes_collection.aggregate([
            { "$group": { "_id": "$created_by", "recipe_count": { "$sum": 1 } } },
            { "$sort": { "recipe_count": -1 } },
            { "$limit": 2 }
        ]))

        return jsonify(top_users)

#Query 2: group recipes by dietary tag and count how many recipes belong to each tag.
@app.route('/api/popular_dietary_tags')
def get_popular_dietary_tags():

        popular_tags = list(recipes_collection.aggregate([
            { "$unwind": "$dietaryTags" },
            { "$group": { "_id": "$dietaryTags", "count": { "$sum": 1 } } },
            { "$sort": { "count": -1 } }
        ]))

        return jsonify(popular_tags)


#Query 3: insert New user
@app.route('/insert_user/<username>/<email>', methods=['Get','POST'])
def insert_user(username, email):
    new_user = {
        "username": username,
        "email": email,
        "profile_picture": f"{username}_profile.jpg",
        "uploaded_recipes": [],
        "joined_at": datetime.utcnow()
    }
    users_collection.insert_one(new_user)
    return jsonify({"message": f"User {username} added successfully!"})

#Query 4: Update profile picture
@app.route('/update_profile_picture/<username>/<new_picture>', methods=['GET', 'PUT'])
def update_profile_picture(username, new_picture):
    users_collection.update_one(
        { "username": username },
        { "$set": { "profile_picture": new_picture } }
    )
    return jsonify({"message": f"Profile picture updated for {username}."})


#Query 5: Delete All Users Who Never Uploaded a Recipe
@app.route('/delete_inactive_users', methods=['GET', 'DELETE'])
def delete_inactive_users():
    result = users_collection.delete_many({ "uploaded_recipes": { "$size": 0 } })
    return jsonify({"message": f"{result.deleted_count} inactive users deleted."})

UPLOAD_FOLDER = os.path.join(app.root_path, "static", "images")  # Set images folder
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')  # In real-world apps, **hash this!**
        uploaded_file = request.files.get('profile-picture')

        profile_picture_filename = None
        if uploaded_file and uploaded_file.filename:
            profile_picture_filename = os.path.join(app.config["UPLOAD_FOLDER"], uploaded_file.filename)
            uploaded_file.save(profile_picture_filename)  # Save the image

        user_data = {
            "_id": username,  # Consider using UUID for unique _id
            "username": username,
            "email": email,
            "profile_picture": f"static/images/{uploaded_file.filename}" if profile_picture_filename else None,
            "uploaded_recipes": [],
        }

        users_collection.insert_one(user_data)

        return redirect(url_for('signup_success'))

    return render_template('signup/templates/signup.html')

@app.route('/signup_success')
def signup_success():
    return "Signup successful! You can now log in."

@app.route('/signup', methods=['POST'])
def prnt_signup():
    print("Signup Form Data:", request.form)  # Debugging Output
    print("Uploaded File:", request.files.get('profile-picture'))

if __name__ == '__main__':
 print("\n🚀 Flask is starting...\n", flush=True)  # Debug print
 print_database_contents()  # This will ensure the database prints before Flask starts
 app.run(debug=True)




