from flask import Blueprint, Flask, request, jsonify
# from flask_cors import CORS
from app_container.models import db, User
from flask_jwt_extended import create_access_token, unset_jwt_cookies


user_routes = Blueprint('user', __name__)

def public_endpoint(function):
    function.is_public = True
    return function

@user_routes.route('/token', methods=["POST"])
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
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
