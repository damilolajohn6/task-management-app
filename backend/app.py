import os
import bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from models import db, Task, User
from datetime import datetime


app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret_key'
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db.init_app(app)

if 'JWT_SECRET_KEY' in os.environ:
    app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']

# Create the database
with app.app_context():
    db.create_all()



# Routes
# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if the username is already taken
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username is already taken'}), 400

    # Hash the password before saving to the database
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'})



# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity={'username': user.username})
    return jsonify(access_token=access_token)



def authenticate(username, password):
    # Fetch the user from the database based on the username
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # Generate a JWT token for the user
        access_token = create_access_token(identity={'username': user.username})
        return access_token

    return None


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/tasks', methods=['GET', 'POST'])
@jwt_required()
def manage_tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        task_list = [{'id': task.id, 'title': task.title, 'description': task.description, 'due_date': task.due_date, 'priority': task.priority, 'category': task.category} for task in tasks]
        return jsonify(task_list)

    if request.method == 'POST':
        data = request.get_json()
        current_user_id = get_jwt_identity().get('username')

        due_date = datetime.strptime(data['due_date'], '%Y-%m-%d') if data.get('due_date') else None

        new_task = Task(
            title=data['title'],
            description=data['description'],
            due_date=due_date,
            priority=data.get('priority'),
            category=data.get('category'),
            user_id=current_user_id
        )

        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task created successfully!'})



@app.route('/tasks/<task_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_task(task_id):
    session = db.session
    task = session.query(Task).get(task_id)

    if request.method == 'GET':
        return jsonify({'id': task.id, 'title': task.title, 'description': task.description})

    if request.method == 'PUT':
        data = request.get_json()

        due_date = datetime.strptime(data['due_date'], '%Y-%m-%d') if data.get('due_date') else task.due_date

        task.title = data['title']
        task.description = data['description']
        task.due_date = due_date
        task.priority = data['priority']
        task.category = data['category']

        session.commit()
        return jsonify({'message': 'Task updated successfully!'})

    if request.method == 'DELETE':
        session.delete(task)
        session.commit()
        return jsonify({'message': 'Task deleted successfully!'})


if __name__ == '__main__':
    app.run(debug=True)
