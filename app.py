from flask import Flask
from flask import render_template
app = Flask(__name__)
from db_connector import mydatabase
@app.route('/')
def homepage():
    return render_template('feed.html')

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)
#

