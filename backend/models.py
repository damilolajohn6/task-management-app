from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    due_date = db.Column(DateTime, nullable=False)
    priority = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)

    # Define a relationship with the User model
    user = relationship('User', back_populates='tasks')

    def __init__(self, title, description, due_date=None, priority=None, category=None, user_id=None):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.priority = priority
        self.category = category
        self.user_id = user_id

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    # Define a back-reference to the tasks associated with this user
    tasks = relationship('Task', back_populates='user')
