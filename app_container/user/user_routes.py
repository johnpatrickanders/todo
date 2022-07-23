from flask import Blueprint, Flask, request, jsonify
from flask_login import login_user
# from flask_cors import CORS
from app_container.models import TaskList, db, User
from app_container.user.utils import object_as_dict
from flask_jwt_extended import create_access_token, unset_jwt_cookies
from flask_login import current_user, login_user, logout_user
from ..forms import LoginForm, SignUpForm

user_routes = Blueprint('user', __name__)


def public_endpoint(function):
    function.is_public = True
    return function


@user_routes.route("/get_csrf")
@public_endpoint
def get_csrf_token():
    form = LoginForm()
    return {"csrfT": form.csrf_token._value()}


@user_routes.route('/login', methods=["POST"])
@public_endpoint
def login():
    if current_user.is_authenticated:
        tasklists = TaskList.query.filter(TaskList.user_id == current_user.id).order_by(TaskList.title).all()
        tasklists = [object_as_dict(tasklist) for tasklist in tasklists]
        response = {
        'user': current_user.to_dict(),
        'tasklists': tasklists
        }
        print(response)
        return response

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter(User.email == email).first()
    if not user or not user.check_password(password):
        return {"error": "No match found for username and password."}
    login_user(user)
    tasklists = TaskList.query.filter(TaskList.user_id == user.id).all()
    tasklists = [object_as_dict(tasklist) for tasklist in tasklists]
    response = {
        'user': user.to_dict(),
        'tasklists': tasklists
        }
    return response


@user_routes.route('/signup', methods=["POST"])
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


@user_routes.route("/logout", methods=["POST"])
def logout():
    logout_user()
    response = jsonify({"msg": "logout successful"})
    return response

@user_routes.route("/loaduser")
def load_user():
    if current_user.is_authenticated:
        tasklists = TaskList.query.filter(TaskList.user_id == current_user.id).order_by(TaskList.title).all()
        tasklists = [object_as_dict(tasklist) for tasklist in tasklists]
        return {
            'user': current_user.to_dict(),
            'tasklists': tasklists }
    return {}
