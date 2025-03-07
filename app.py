
from flask import Flask, session, redirect, url_for, render_template, jsonify, request
import os
from werkzeug.utils import secure_filename, send_file
from werkzeug.security import generate_password_hash, check_password_hash
from db_connector import users_collection, recipes_collection, mydatabase
from datetime import datetime
from analyzeDB import print_database_contents

template_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'pages')

app = Flask(__name__, template_folder=template_dir, static_folder=template_dir)
app.secret_key = os.urandom(24)
@app.route('/')
def defult():
    return render_template('login/templates/login.html')

@app.route('/feed')
def feed():
    recipes = list(recipes_collection.find())
    return render_template('feed/templates/feed.html', recipes=recipes)

@app.route('/login')
def logout():
    session.pop('username', None)
    return render_template('login/templates/login.html')

@app.route('/login', methods=['POST'])
def login():
    print("Received login request...")

    email = request.form.get('email')
    password = request.form.get('password')

    if not email or not password:
        print("Missing email or password!")
        return jsonify({"error": "Email and password are required."}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        print("User not found!")
        return jsonify({"error": "User not found."}), 400

    # Check hashed password
    if not check_password_hash(user["password"], password):
        print("Incorrect password!")
        return jsonify({"error": "Incorrect password."}), 400

    session['username'] = user['username']
    print(f"✅ User {user['username']} logged in successfully!")
    return jsonify({"message": "Login successful!", "redirect": "/feed"}), 200

@app.route('/signup', methods=['POST'])
def signup():
    try:
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        uploaded_file = request.files.get('profile-picture')

        # Validate required fields
        if not username or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Check if user already exists
        if users_collection.find_one({"username": username}):
            return jsonify({"error": "Username already taken"}), 400

        # Hash the password before storing
        hashed_password = generate_password_hash(password)

        image_url = None
        if uploaded_file and uploaded_file.filename:
            filename = secure_filename(f"{username}.jpg")
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            uploaded_file.save(image_path)
            image_url = f"images/{filename}"

        new_user = {
            "username": username,
            "email": email,
            "password": hashed_password,  # Store the hashed password
            "profile_picture": image_url,
            "uploaded_recipes": [],
            "joined_at": datetime.utcnow()
        }

        users_collection.insert_one(new_user)
        print("New user added to DB:", new_user)

        return jsonify({"message": "Signup successful!", "redirect": "/login"}), 200

    except Exception as e:
        print("Signup Error:", str(e))
        return jsonify({"error": "Internal server error"}),500

@app.route('/post')
def post_page():
    return render_template('post/templates/post.html')

@app.route('/profile')
def profile():
    # Check if user is logged in (session contains username)
    if 'username' not in session:
        return redirect(url_for('login'))  # Redirect to login if not logged in

    # Fetch user data from the database
    user = users_collection.find_one({"username": session['username']}, {"_id": 0})

    if not user:
        return "User not found", 404  # Handle case where user is not in database

    recipe_ids = user.get("uploaded_recipes", [])  # Get the list of recipe IDs
    recipes = list(recipes_collection.find({"_id": {"$in": recipe_ids}}))

    return render_template('profile/templates/profile.html', user=user, recipes=recipes)

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
            {"_id": 1, "title": 1, "image_url": 1, "created_by": 1, "created_at": 1}  #Include _id
        ))
        results['recipes'] = recipes

    # Search Recipes by User
    if 'users' in filters:
        recipes_by_user = list(recipes_collection.find(
            {"created_by": {"$regex": query, "$options": "i"}},
            {"_id": 1, "title": 1, "image_url": 1, "created_by": 1, "created_at": 1}  #Include _id
        ))
        results['recipes_by_user'] = recipes_by_user

    # Search Recipes by Tag
    if 'tags' in filters:
        tagged_recipes = list(recipes_collection.find(
            {"dietaryTags": {"$regex": query, "$options": "i"}},
            {"_id": 1, "title": 1, "image_url": 1, "created_by": 1, "created_at": 1}  #Include _id
        ))
        results['recipes_by_tag'] = tagged_recipes

    return render_template('search_results/templates/search_results.html', results=results, query=query)


UPLOAD_FOLDER = os.path.join(os.getcwd(), "pages" , "images")
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route('/signup_success')
def signup_success():
    return "Signup successful! You can now log in."

@app.route('/signup', methods=['GET','POST'])
def prnt_signup():
    print("Signup Form Data:", request.form)  # Debugging Output
    print("Uploaded File:", request.files.get('profile-picture'))

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route('/post', methods=['GET','POST'])
def post_recipe():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized. Please log in."}), 401  # Prevent posting if not logged in

    if request.method == 'POST':
        print("✅ Form received!")  # Debugging

        title = request.form.get('title')
        description = request.form.get('description')
        ingredients = request.form.get('ingredients').split("\n") if request.form.get('ingredients') else []
        recipe_steps = request.form.get('recipe').split("\n") if request.form.get('recipe') else []
        dietary_tags = request.form.get('dietaryTags')
        if dietary_tags:
            dietary_tags = eval(dietary_tags)  # Convert from JSON string to list

        created_by = session['username']  # TODO: Replace with session-based user
        created_at = datetime.utcnow()

        uploaded_file = request.files.get('photo')
        image_url = None

        if uploaded_file and uploaded_file.filename:
            filename = secure_filename(f"{title.replace(' ', '_')}.jpg")  # Save image with recipe title
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            uploaded_file.save(image_path)
            image_url = f"images/{filename}"  # Match the format used in signup

        recipe_id = f"recipe_{int(datetime.timestamp(datetime.utcnow()))}"

        new_recipe = {
            "_id": recipe_id,
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

        users_collection.update_one(
            {"username": created_by},
            {"$push": {"uploaded_recipes": recipe_id}}  # Add recipe_id to array
        )

        return jsonify({"message": "Recipe posted successfully!", "redirect": "/feed"})

@app.route('/edit_profile', methods=['GET', 'POST'])
def edit_profile():
    if 'username' not in session:
        # return redirect(url_for('login'))
        return jsonify({"error": "User not logged in"}), 401  # Return JSON instead of redirect

    user = users_collection.find_one({"username": session['username']})

    if request.method == 'POST':
        new_username = request.form.get('username')
        new_email = request.form.get('email')
        new_password = request.form.get('password')
        uploaded_file = request.files.get('profile-picture')

        update_data = {"username": new_username, "email": new_email}

        # Only update password if a new one is provided
        if new_password:
            update_data["password"] = generate_password_hash(new_password)

        # Update profile picture
        if uploaded_file and uploaded_file.filename:
            filename = secure_filename(f"{new_username}.jpg")
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            uploaded_file.save(image_path)
            update_data["profile_picture"] = f"images/{filename}"

        # Update user in MongoDB
        users_collection.update_one({"username": session['username']}, {"$set": update_data})
        session['username'] = new_username  # Update session if username changed

        return jsonify({"message": "Edit successful!", "redirect": "/profile"}), 200

    return render_template('edit_profile/templates/edit_profile.html', user=user)

@app.route('/delete_user')
def delete_user():
    if 'username' not in session:
        return redirect(url_for('login'))

    users_collection.delete_one({"username": session['username']})
    session.clear()  # Log out user after deleting account
    return redirect(url_for('login'))  # Redirect to signup after deletion

@app.route('/check_username/<username>', methods=['GET'])
def check_username(username):
    existing_user = users_collection.find_one({"username": username})
    return jsonify({"exists": bool(existing_user)})

if __name__ == '__main__':
 print("\n Flask is starting...\n", flush=True)  # Debug print
 print_database_contents()
 app.run(debug=True)