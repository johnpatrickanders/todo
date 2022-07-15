from email.headerregistry import ContentTypeHeader
import os, json
from datetime import datetime, timedelta, timezone
# import time
from flask import Flask, abort, request, jsonify
from sqlalchemy import inspect
from app_container.config import ConfigApp
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app_container.models import db, User, TaskList, Task
from flask_migrate import Migrate
import boto3
from botocore.config import Config as ConfigBoto
from botocore.exceptions import ClientError
from flask_login import LoginManager
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager, verify_jwt_in_request

def public_endpoint(function):
    function.is_public = True
    return function


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

boto_config = ConfigBoto(
    region_name = 'us-east-1',
    signature_version = 's3v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)


app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config.from_object(ConfigApp)
db.init_app(app)
Migrate(app, db)

login = LoginManager(app)
# login.login_view = 'auth.login'

# from .auth import auth as auth_blueprint
# app.register_blueprint(auth_blueprint)

jwt = JWTManager(app)

@app.before_request
def check_login():
    if (request.endpoint and 'static' not in request.endpoint
            and not getattr(app.view_functions[request.endpoint], 'is_public', False)):
        try:
            verify_jwt_in_request()
        except:
            abort(401)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/token', methods=["POST"])
@public_endpoint
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter(User.email == email).first()
    if not user or not user.check_password(password):
        return {"error": "No match found for username and password."}
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route('/signup', methods=["POST"])
@public_endpoint
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not email or not password:
        return {"error": "enter valid email and password"}
    user = User(
            email=email,
            password=password,
        )
    db.session.add(user)
    db.session.commit()
    return user.to_dict()

@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def react_root(path):
#     print("path", path)
#     if path == 'favicon.ico':
#         return app.send_static_file('favicon.ico')
#     return app.send_static_file('index.html')


# @login.user_loader
# def load_user(id):
#     return User.query.get(int(id))




@app.route('/home')  # is used, do not change to "/"
def home():
    user = User.query.get(int(1)).to_dict()
    print("Home User:", user)
    return user


@app.route('/tasklists')
# @jwt_required()
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
    post_contents = None
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
    if data["fileName"]:
        post_contents = create_presigned_post(data['fileName'])
        task.file_name = data["fileName"]
    # task.update_date = datetime.now()
    db.session.commit()
    return {"updatedTask": task.to_dict(), 'preSignedPostS3':post_contents}


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

# NOT IN USE: use if want to upload image directly via backend
@app.route('/put_s3/<fileName>', methods=['POST'])
def put_s3(fileName):
    S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
    s3 = boto3.resource('s3')
    data = request.files['file']
    print(data)
    s3.Bucket(S3_BUCKET_NAME).put_object(Key=fileName, Body=data)
    return {'data': fileName + ' uploaded successfully'}

def create_presigned_url(object_name, expiration, bucket_name=os.environ.get('S3_BUCKET_NAME')):
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket':bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        print(e)
        return None

    # The response contains the presigned URL
    return {'url': response}

@app.route('/sign_s3_get/<file_name>')
def get_presigned_url(file_name):
    return create_presigned_url(object_name=file_name, expiration=3600)


def create_presigned_post(object_name, bucket_name=os.environ.get('S3_BUCKET_NAME'),
                          fields=None, conditions=None, expiration=3600):
    """Generate a presigned URL S3 POST request to upload a file

    :param bucket_name: string
    :param object_name: string
    :param fields: Dictionary of prefilled form fields
    :param conditions: List of conditions to include in the policy
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Dictionary with the following keys:
        url: URL to post to
        fields: Dictionary of form fields and values to submit with the POST
    :return: None if error.
    """

    # Generate a presigned S3 POST URL
    s3_client = boto3.client('s3', config=boto_config)
    try:
        response = s3_client.generate_presigned_post(bucket_name,
                                                    object_name,
                                                     Fields=fields,
                                                     Conditions=conditions,
                                                     ExpiresIn=expiration)
    except ClientError as e:
        print(e)
        return None

    # The response contains the presigned URL and required fields
    print(response)
    return response


@app.route('/sign_s3_post', methods=["POST"])
def post_presigned_url():
    data = request.json
    file_name = data["fileName"]
    file_type = data["fileType"]
    print(file_name, file_type)
    res = create_presigned_post(object_name=file_name)

    print("res", res)
    return res

@app.route('/post_success/<taskId>', methods=["PUT"])
def on_post_success(taskId):
    data = request.json
    task = Task.query.filter(Task.id == int(taskId)).first()
    task.file_name = data["fileName"]
    db.session.commit()
    return {"updatedTask": task.title}
