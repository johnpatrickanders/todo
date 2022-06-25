import os
from datetime import datetime
# import time
from flask import Flask, jsonify, request
from sqlalchemy import inspect
from app_container.config import Config
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app_container.models import db, User, TaskList, Task
from flask_migrate import Migrate
import boto3

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
    print(boto3.__version__)
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
    # task.update_date = datetime.now()
    db.session.commit()
    return {"updatedTask": task.to_dict()}


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


@app.route('/task/<taskId>', methods=["DELETE"])
def delete_task(taskId):
    # taskId = request.json["taskId"]
    taskToDelete = Task.query.filter(Task.id == int(taskId)).first()
    taskTitle = taskToDelete.title
    db.session.delete(taskToDelete)
    db.session.commit()

    return {"deletedTask": taskTitle}


@app.route('/sign_s3', methods=["POST"])
def sign_s3():
    S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
    data = request.json
    print(data)
    file_name = data["fileName"]
    file_type = data["fileType"]
    s3 = boto3.client('s3')
    print('file_name:', file_name)
    presigned_post = s3.generate_presigned_post(
        Bucket=S3_BUCKET_NAME,
        Key=file_name,
        Fields={"acl": "public-read", "Content-Type": file_type},
        Conditions=[
            {"acl": "public-read"},
            {"Content-Type": file_type}
        ],
        ExpiresIn=3600
    )
    return {
        'data': presigned_post,
        'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET_NAME, file_name)
    }
