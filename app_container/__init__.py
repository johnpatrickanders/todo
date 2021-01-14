import os
# import time
from flask import Flask
from app_container.config import Config
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app_container.models import db, User
from flask_migrate import Migrate

app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)


@app.route('/')
def home():
    return {'message': 'hope on'}


# @app.route('/time')
# def get_current_time():
#     # my_list = db.List()
#     # db.session.add
#     return {'time': time.time()}
