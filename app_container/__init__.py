import os
import time
from flask import Flask
from app_container.config import Config
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config.from_object(Config)


@app.route('/')
def home():
    return {'message': 'hope on'}


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
