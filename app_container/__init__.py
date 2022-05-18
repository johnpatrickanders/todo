import os
# import time
from flask import Flask, jsonify, request
from sqlalchemy import inspect
from app_container.config import Config
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app_container.models import db, User, TaskList, Task
from flask_migrate import Migrate

app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


@app.route('/home') # is used, do not change to "/"
def home():
    user = User.query.get(int(1)).to_dict()
    print("Home User:", user)
    return user


@app.route('/tasklists')
def get_tasklists():
    tasklists = TaskList.query.filter(TaskList.userId == 1).all()
    # res = [tasklist.to_dict() for tasklist in tasklists]
    res = [object_as_dict(tasklist) for tasklist in tasklists]

    return {'tasklists': res}


@app.route('/tasks')
def get_tasks():
    tasks = Task.query.filter(Task.taskListId == 1).all()
    res = [object_as_dict(task) for task in tasks]
    return {'tasks': res}

@app.route('/list', methods=["POST"])
def add_list():
    data = request.json
    task_list = TaskList(
        userId=data["userId"],
        title=data["title"],
    )
    db.session.add(task_list)
    db.session.commit()

    return {"title": task_list.title,}

@app.route('/task', methods=["POST"]) # may want to reviese model to use userId
def add_task():
    data = request.json
    task = Task(
        taskListId=data["taskListId"],
        title=data["title"],
    )
    db.session.add(task)
    db.session.commit()

    return {"title": task.title,}

@app.route('/task/delete', methods=["DELETE"])
def delete_task():
    taskId = request.json["taskId"]
    taskToDelete = Task.query.filter(Task.id == int(taskId)).first()
    taskTitle = taskToDelete.title
    db.session.delete(taskToDelete)
    db.session.commit()

    return {"deletedTask": taskTitle}
