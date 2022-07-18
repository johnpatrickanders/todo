import json
from app_container.user.user_routes import user_routes
from app_container.user.task_routes import task_routes
from datetime import datetime, timedelta, timezone
from flask import Flask, abort, request, jsonify
from app_container.config import ConfigApp
# from flask_cors import CORS
from app_container.models import db
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, JWTManager, verify_jwt_in_request


app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

app.config.from_object(ConfigApp)
app.register_blueprint(user_routes, url_prefix='/')
app.register_blueprint(task_routes, url_prefix='/')
db.init_app(app)
Migrate(app, db)

login = LoginManager(app)

jwt = JWTManager(app)


@app.before_request
def check_login():
    if (request.endpoint and 'static' not in request.endpoint
            and not getattr(app.view_functions[request.endpoint], 'is_public', False)):
        try:
            verify_jwt_in_request()
        except:
            response = jsonify({"msg": "logout successful"})
            unset_jwt_cookies(response)
            return response
            # abort(401)


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
