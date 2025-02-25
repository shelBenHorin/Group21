from flask import Flask, session, redirect, url_for, render_template
import os

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

if __name__ == '__main__':
    app.run(debug=True)

