import os
from app_container.user.user_routes import user_routes
from app_container.user.task_routes import task_routes
from flask import Flask
from app_container.config import ConfigApp
from app_container.models import db, User
from flask_migrate import Migrate
from flask_login import LoginManager

from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf


from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["300 per day", "75 per hour"]
)

app.config.from_object(ConfigApp)
app.register_blueprint(user_routes, url_prefix='/')
app.register_blueprint(task_routes, url_prefix='/')
db.init_app(app)
Migrate(app, db)

login = LoginManager(app)
CORS(app)


@app.after_request
@limiter.exempt
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@login.user_loader
@limiter.exempt
def load_user(id):
    return User.query.get(id)
