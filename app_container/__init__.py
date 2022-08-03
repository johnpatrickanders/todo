import os
from app_container.user.user_routes import user_routes
from app_container.user.task_routes import task_routes
from flask import Flask, send_from_directory
from app_container.config import ConfigApp
from app_container.models import db, User
from flask_migrate import Migrate
from flask_login import LoginManager

from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf


from app_container.utils import limiter


app = Flask(__name__)

limiter.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)


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

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'media'),
                               'favicon.ico', mimetype='image/png')
