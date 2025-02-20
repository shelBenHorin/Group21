from flask import Flask, session, redirect, url_for, render_template
import os

template_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'pages', 'feed', 'templates')

app = Flask(__name__, template_folder=template_dir, static_folder='pages/feed/static')

@app.route('/')
def feed():
    return render_template('feed.html')

if __name__ == '__main__':
    app.run(debug=True)
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)
#

