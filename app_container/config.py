import os


class ConfigApp:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    SQLALCHEMY_ECHO = True
    FLASK_ENV = os.environ.get('FLASK_ENV')
    # FLASK_APP = os.environ.get('FLASK_APP')
    # S3_BUCKET = os.environ.get("S3_BUCKET_NAME")
    # S3_KEY = os.environ.get("AWS_ACCESS_KEY_ID")
    # S3_SECRET = os.environ.get("AWS_SECRET_ACCESS_KEY")
    # S3_LOCATION = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)
