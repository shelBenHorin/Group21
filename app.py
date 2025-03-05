from flask import Flask, session, redirect, url_for, render_template, jsonify, request
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
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
    recipes = list(recipes_collection.find())
    return render_template('feed/templates/feed.html', recipes=recipes)

# @app.route('/login')
# def login():
#     return render_template('login/templates/login.html')
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    print("📥 Received login request:")
    print(f"   Email: {email}")
    print(f"   Password: {'*' * len(password) if password else 'None'}")

    # 🚨 Check if fields are empty
    if not email or not password:
        print("❌ Missing email or password!")
        return jsonify({"error": "Email and password are required."}), 400

    # 🚨 Find user by email
    user = users_collection.find_one({"email": email})
    if not user:
        print("❌ User not found!")
        return jsonify({"error": "User not found."}), 400

    # 🚨 Check if the password is correct
    if not check_password_hash(user["password"], password):
        print("❌ Incorrect password!")
        return jsonify({"error": "Incorrect password."}), 400

    # ✅ Login successful
    session['username'] = user['username']
    print(f"✅ User {user['username']} logged in successfully!")

    return jsonify({"message": "Login successful!", "redirect": "/feed"}), 200


@app.route('/post')
def post_page():
    return render_template('post/templates/post.html')

# @app.route('/recipe')
# def recipe():
#     return render_template('recipe/templates/recipe.html')


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


# @app.route('/profile')
# def profile():
#     return render_template('profile/templates/profile.html')

@app.route('/profile')
def profile():
    # Check if user is logged in (session contains username)
    if 'username' not in session:
        return redirect(url_for('login'))  # Redirect to login if not logged in

    # Fetch user data from the database
    user = users_collection.find_one({"username": session['username']}, {"_id": 0})

    if not user:
        return "User not found", 404  # Handle case where user is not in database

    return render_template('profile/templates/profile.html', user=user)


@app.route('/search')
def search():
    return render_template('search/templates/search.html')

@app.route('/signup', methods=['GET'])
def signup_page():
    return render_template('signup/templates/signup.html')


@app.route('/users')
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))  # Fetch all users, exclude `_id`
    return render_template('users.html', users=users)

# @app.route('/recipes')
# def get_recipes():
#     recipes = list(recipes_collection.find({}, {"_id": 0}))  # Fetch all recipes
#     return render_template('recipes.html', recipes=recipes)
#
#

@app.route("/recipe/<recipe_id>")
def recipe(recipe_id):
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

#----handle search requests and return results from MongoDB----
@app.route('/search_results')
def search_results():
    query = request.args.get('query', '').strip()  # Get search query
    filters = request.args.getlist('filter')  # Get selected filters (recipes, tags, users)

    results = {}

    # Search Recipes by Title
    if 'recipes' in filters:
        recipes = list(recipes_collection.find(
            {"title": {"$regex": query, "$options": "i"}},  # Case-insensitive search
            {"_id": 1, "title": 1, "image_url": 1, "created_by": 1, "created_at": 1}  # ✅ Include _id
        ))
        results['recipes'] = recipes

    # Search Recipes by User
    if 'users' in filters:
        recipes_by_user = list(recipes_collection.find(
            {"created_by": {"$regex": query, "$options": "i"}},
            {"_id": 1, "title": 1, "image_url": 1, "created_by": 1, "created_at": 1}  # ✅ Include _id
        ))
        results['recipes_by_user'] = recipes_by_user

    # Search Recipes by Tag
    if 'tags' in filters:
        tagged_recipes = list(recipes_collection.find(
            {"dietaryTags": {"$regex": query, "$options": "i"}},
            {"_id": 1, "title": 1, "image_url": 1, "created_by": 1, "created_at": 1}  # ✅ Include _id
        ))
        results['recipes_by_tag'] = tagged_recipes

    return render_template('search_results/templates/search_results.html', results=results, query=query)

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

# UPLOAD_FOLDER = os.path.join(app.root_path, "static", "images")  # Set images folder
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
#
# UPLOAD_FOLDER = "static/images"
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

UPLOAD_FOLDER = os.path.join(os.getcwd(), "static", "images")
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
@app.route('/signup', methods=['POST'])
def signup():
    try:
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        uploaded_file = request.files.get('profile-picture')

        # ✅ Debugging: Print received data
        print("📩 Received Signup Request:")
        print(f"   Username: {username}")
        print(f"   Email: {email}")
        print(f"   Password: {'*' * len(password) if password else 'None'}")
        print(f"   Uploaded File: {uploaded_file.filename if uploaded_file else 'No file'}")

        # 🚨 Validate required fields
        if not username or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # 🚨 Check if user already exists
        if users_collection.find_one({"username": username}):
            return jsonify({"error": "Username already taken"}), 400

        image_url = None
        if uploaded_file and uploaded_file.filename:
            filename = secure_filename(uploaded_file.filename)
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            uploaded_file.save(image_path)
            image_url = f"static/images/{filename}"

        new_user = {
            "username": username,
            "email": email,
            "profile_picture": image_url,
            "uploaded_recipes": [],
            "joined_at": datetime.utcnow()
        }

        users_collection.insert_one(new_user)
        print("✅ New user added to DB:", new_user)

        return jsonify({"message": "Signup successful!", "redirect": "/feed"}), 200

    except Exception as e:
        print("❌ Signup Error:", str(e))
        return jsonify({"error": "Internal server error"}), 500

@app.route('/signup_success')
def signup_success():
    return "Signup successful! You can now log in."

@app.route('/signup', methods=['GET','POST'])
def prnt_signup():
    print("Signup Form Data:", request.form)  # Debugging Output
    print("Uploaded File:", request.files.get('profile-picture'))

# @app.route('/post', methods=['GET', 'POST'])
# def post_recipe():
#     if request.method == 'POST':
#         print("✅ Form received!")  # Debug message
#
#         title = request.form.get('title')
#         description = request.form.get('description')
#         ingredients = request.form.get('ingredients').split("\n")
#         recipe_steps = request.form.get('recipe').split("\n")
#         dietary_tags = request.form.getlist('dietary')
#         created_by = "user_001"  # TODO: Get from session after login
#         created_at = datetime.utcnow()
#
#         uploaded_file = request.files.get('photo')
#         image_path = None
#
#         if uploaded_file and uploaded_file.filename:
#             image_path = os.path.join(app.config["UPLOAD_FOLDER"], uploaded_file.filename)
#             uploaded_file.save(image_path)
#
#         new_recipe = {
#             "_id": f"recipe_{int(datetime.timestamp(datetime.utcnow()))}",
#             "title": title,
#             "created_by": created_by,
#             "created_at": created_at,
#             "description": description,
#             "ingredients": ingredients,
#             "recipe": recipe_steps,
#             "dietaryTags": dietary_tags,
#             "image_url": image_path if image_path else None,
#         }
#
#         recipes_collection.insert_one(new_recipe)
#         print("✅ Recipe added to DB:", new_recipe)
#
#         return redirect(url_for('feed'))  # Redirect to feed after posting
#
#     return render_template("post/templates/post.html")


# app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
# @app.route('/post', methods=['GET', 'POST'])
# def post_recipe():
#     if request.method == 'POST':
#         print("✅ Form received!")  # Debug message
#
#         # Print form data for debugging
#         print("🔹 Title:", request.form.get('title'))
#         print("🔹 Description:", request.form.get('description'))
#         print("🔹 Ingredients:", request.form.get('ingredients'))
#         print("🔹 Recipe:", request.form.get('recipe'))
#         print("🔹 Dietary Tags:", request.form.getlist('dietary'))
#         print("🔹 Uploaded File:", request.files.get('photo'))
#
#         title = request.form.get('title')
#         description = request.form.get('description')
#         ingredients = request.form.get('ingredients').split("\n") if request.form.get('ingredients') else []
#         recipe_steps = request.form.get('recipe').split("\n") if request.form.get('recipe') else []
#         dietary_tags = request.form.getlist('dietary')
#         created_by = "user_001"  # TODO: Get from session after login
#         created_at = datetime.utcnow()
#
#         uploaded_file = request.files.get('photo')
#         image_path = None
#
#         if uploaded_file and uploaded_file.filename:
#             image_path = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(uploaded_file.filename))
#             uploaded_file.save(image_path)
#             print("✅ Image saved at:", image_path)
#
#         new_recipe = {
#             "_id": f"recipe_{int(datetime.timestamp(datetime.utcnow()))}",
#             "title": title,
#             "created_by": created_by,
#             "created_at": created_at,
#             "description": description,
#             "ingredients": ingredients,
#             "recipe": recipe_steps,
#             "dietaryTags": dietary_tags,
#             "image_url": uploaded_file.filename if uploaded_file else None,
#         }
#
#         # Debugging print before inserting
#         print("✅ Preparing to insert into MongoDB:", new_recipe)
#
#         recipes_collection.insert_one(new_recipe)
#         print("✅ Recipe added to DB:", new_recipe)
#
#         return redirect(url_for('feed'))  # Redirect to feed after posting
#
#     return render_template("post/templates/post.html")

@app.route('/post', methods=['GET','POST'])
def post_recipe():
    if request.method == 'POST':
        print("✅ Form received!")  # Debugging

        title = request.form.get('title')
        description = request.form.get('description')
        ingredients = request.form.get('ingredients').split("\n") if request.form.get('ingredients') else []
        recipe_steps = request.form.get('recipe').split("\n") if request.form.get('recipe') else []
        dietary_tags = request.form.get('dietaryTags')
        if dietary_tags:
            dietary_tags = eval(dietary_tags)  # Convert from JSON string to list

        created_by = "user_001"  # TODO: Replace with session-based user
        created_at = datetime.utcnow()

        uploaded_file = request.files.get('photo')
        image_url = None

        if uploaded_file and uploaded_file.filename:
            filename = secure_filename(uploaded_file.filename)
            image_url = os.path.join("static/images", filename)
            uploaded_file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            print("✅ Image saved at:", image_url)

        new_recipe = {
            "_id": f"recipe_{int(datetime.timestamp(datetime.utcnow()))}",
            "title": title,
            "description": description,
            "ingredients": ingredients,
            "recipe": recipe_steps,
            "dietaryTags": dietary_tags,
            "image_url": image_url,
            "created_by": created_by,
            "created_at": created_at,
        }

        print("✅ Saving to MongoDB:", new_recipe)
        recipes_collection.insert_one(new_recipe)

        return jsonify({"message": "Recipe posted successfully!", "redirect": "/feed"})

if __name__ == '__main__':
 print("\n🚀 Flask is starting...\n", flush=True)  # Debug print
 print_database_contents()  # This will ensure the database prints before Flask starts
 app.run(debug=True)




