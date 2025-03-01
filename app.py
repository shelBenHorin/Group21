from flask import Flask, session, redirect, url_for, render_template
import os
from db_connector import users_collection, recipes_collection

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

@app.route('/signup')
def signup():
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


if __name__ == '__main__':
    app.run(debug=True)

