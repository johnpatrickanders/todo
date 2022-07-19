import os
from flask import Blueprint, request
from app_container.models import db, User, TaskList, Task
import boto3
from botocore.config import Config as ConfigBoto
from botocore.exceptions import ClientError
from app_container.user.utils import object_as_dict
from flask_login import current_user

task_routes = Blueprint('task', __name__)

boto_config = ConfigBoto(
    region_name = 'us-east-1',
    signature_version = 's3v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)

@task_routes.route('/home')  # is used, do not change to "/"
def home():
    user = User.query.get(current_user.id)
    print("Home User:", user)
    tasklists = TaskList.query.filter(TaskList.user_id == user.id).all()
    tasklists = [object_as_dict(tasklist) for tasklist in tasklists]
    return {'user': user.to_dict(), 'tasklists': tasklists}


@task_routes.route('/tasklists')
def get_tasklists():
    print(boto3.__version__)
    tasklists = TaskList.query.filter(TaskList.user_id == current_user.id).all()
    res = [object_as_dict(tasklist) for tasklist in tasklists]


    return {'tasklists': res}


@task_routes.route('/tasks/<taskListId>')
def get_tasks(taskListId):
    print(taskListId)
    # if not taskListId or taskListId is None:
    #     taskListId = 1
    tasks = Task.query.filter(Task.task_list_id == int(taskListId)).all()
    res = [task.to_dict() for task in tasks]
    return {'tasks': res}


@task_routes.route('/tasks/<taskId>/status', methods=["PUT"])
def update_status(taskId):
    data = request.json
    task = Task.query.filter(Task.id == int(taskId)).first()
    task.status = data["status"]
    db.session.commit()
    return {"updatedTask": task.title}


@task_routes.route('/tasks/<taskId>', methods=["PUT"])
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


@task_routes.route('/list', methods=["POST"])
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
@task_routes.route('/task/<taskListId>', methods=["POST"])
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


@task_routes.route('/task/<taskId>', methods=["DELETE"])
def delete_task(taskId):
    # taskId = request.json["taskId"]
    taskToDelete = Task.query.filter(Task.id == int(taskId)).first()
    taskTitle = taskToDelete.title
    db.session.delete(taskToDelete)
    db.session.commit()

    return {"deletedTask": taskTitle}

# NOT IN USE: use if want to upload image directly via backend
@task_routes.route('/put_s3/<fileName>', methods=['POST'])
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

@task_routes.route('/sign_s3_get/<file_name>')
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


@task_routes.route('/sign_s3_post', methods=["POST"])
def post_presigned_url():
    data = request.json
    file_name = data["fileName"]
    file_type = data["fileType"]
    print(file_name, file_type)
    res = create_presigned_post(object_name=file_name)

    print("res", res)
    return res

@task_routes.route('/post_success/<taskId>', methods=["PUT"])
def on_post_success(taskId):
    data = request.json
    task = Task.query.filter(Task.id == int(taskId)).first()
    task.file_name = data["fileName"]
    db.session.commit()
    return {"updatedTask": task.title}
