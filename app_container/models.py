from flask_sqlalchemy import SQLAlchemy
# from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(100), nullable=False)

    tasklists = db.relationship("TaskList", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class TaskList(db.Model):
    __tablename__ = "tasklists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="tasklists")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "title": self.title,
        }


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    taskListId = db.Column(db.Integer, db.ForeignKey(
        "tasklists.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    status = db.Column(db.String(50), default="Open")
    tag = db.Column(db.String(50), default="Open")
    create_date = db.Column(db.DateTime, server_default=db.func.now())
    update_date = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    due_date = db.Column(db.DateTime, server_default=None)
    remind_date = db.Column(db.DateTime, server_default=None)

    taskList = db.relationship("TaskList", foreign_keys=taskListId)
