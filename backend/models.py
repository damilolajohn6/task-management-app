from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    due_date = db.Column(DateTime, nullable=False)
    priority = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50), nullable=False)

    def __init__(self, title, description, due_date=None, priority=None, category=None):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.priority = priority
        self.category = category


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
