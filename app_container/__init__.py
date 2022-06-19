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


@app.route('/home')  # is used, do not change to "/"
def home():
    user = User.query.get(int(1)).to_dict()
    print("Home User:", user)
    return user


@app.route('/tasklists')
def get_tasklists():
    tasklists = TaskList.query.filter(TaskList.user_id == 1).all()
    # res = [tasklist.to_dict() for tasklist in tasklists]
    res = [object_as_dict(tasklist) for tasklist in tasklists]

    return {'tasklists': res}


@app.route('/tasks/<taskListId>')
def get_tasks(taskListId):
    if not taskListId:
        taskListId = 1
    tasks = Task.query.filter(Task.task_list_id == int(taskListId)).all()
    res = [task.to_dict() for task in tasks]
    return {'tasks': res}


@app.route('/tasks/<taskId>/status', methods=["PUT"])
def update_status(taskId):
    data = request.json
    task = Task.query.filter(Task.id == int(taskId)).first()
    task.status = data["status"]
    db.session.commit()
    return {"updatedTask": task.title}


@app.route('/tasks/<taskId>', methods=["PUT"])
def update_task(taskId):
    data = request.json
    task = Task.query.filter(Task.id == int(taskId)).first()
    if data["title"]:
        task.title = data["title"]
    if data["tag"]:
        task.tag = data["tag"]
    if data["createDate"]:
        task.create_date = data["createDate"]
    if data["dueDate"]:
        task.due_date = data["dueDate"]
    if data["remindDate"]:
        task.remind_date = data["remindDate"]
    db.session.commit()
    return {"updatedTask": task.title}


@app.route('/list', methods=["POST"])
def add_list():
    data = request.json
    task_list = TaskList(
        user_id=data["userId"],
        title=data["title"],
    )
    db.session.add(task_list)
    db.session.commit()

    return {"title": task_list.title, }


# may want to reviese model to use userId
@app.route('/task/<taskListId>', methods=["POST"])
def add_task(taskListId):
    data = request.json
    print(data)
    print(taskListId)
    task = Task(
        task_list_id=int(taskListId),
        title=data["title"],
    )
    db.session.add(task)
    db.session.commit()

    return {"task": object_as_dict(task)}


@app.route('/task/delete', methods=["DELETE"])
def delete_task():
    taskId = request.json["taskId"]
    taskToDelete = Task.query.filter(Task.id == int(taskId)).first()
    taskTitle = taskToDelete.title
    db.session.delete(taskToDelete)
    db.session.commit()

    return {"deletedTask": taskTitle}
