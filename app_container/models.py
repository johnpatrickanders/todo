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
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="tasklists")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
        }


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    task_list_id = db.Column(db.Integer, db.ForeignKey(
        "tasklists.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    status = db.Column(db.String(50), default="Open")
    tag = db.Column(db.String(50), default=None)
    create_date = db.Column(db.DateTime, server_default=db.func.now())
    update_date = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    due_date = db.Column(db.DateTime, server_default=None)
    remind_date = db.Column(db.DateTime, server_default=None)

    task_list = db.relationship("TaskList", foreign_keys=task_list_id)

    def to_dict(self):
        return {
            'id': self.id,
            'listTitle': self.task_list.title,
            'taskListId': self.task_list_id,
            'title': self.title,
            'status': self.status,
            'tag': self.tag,
            'createDate': self.create_date.strftime('%Y-%m-%d'),
            'updateDate': self.update_date,
            'dueDate': self.due_date.strftime('%Y-%m-%d') if self.due_date else None,
            'remindDate': self.remind_date.strftime('%Y-%m-%d') if self.remind_date else None,
            'userId': self.task_list.user_id
        }
