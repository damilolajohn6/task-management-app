### DOCUMENTATION for the project
To run the Task Management Web Application locally, you'll need to set up and run both the frontend (React.js) and backend (Flask) components. Below are the step-by-step instructions for setting up and running the application on your local machine.

### Backend (Flask) Setup

1. **Install Dependencies:**
   Make sure you have Python and pip (Python package installer) installed on your machine. Then, install the necessary Python packages using pip.

   ```bash
   pip install flask flask_sqlalchemy
   ```

2. **Database Setup:**
   Choose a database system (e.g., SQLite, PostgreSQL) and configure the database settings in the `config.py` file or wherever you store your configuration.

3. **Run the Flask Application:**
   Navigate to the backend directory and run the Flask application.

   ```bash
   cd Backend
   python app.py
   ```

   The Flask application will start running at `http://localhost:5000`.

### Frontend (React.js) Setup

1. **Install Dependencies:**
   Navigate to the frontend directory and install the required packages using npm (Node Package Manager).

   ```bash
   cd Frontend/task-management-app
   npm install
   ```

2. **Run the React Application:**
   Start the React development server.

   ```bash
   npm start
   ```

   The React application will start running at `http://localhost:3000`.

### Accessing the Application

Visit `http://localhost:3000` in your web browser to access the Task Management Web Application. The frontend will interact with the backend via API calls to perform CRUD operations on tasks.

Ensure that both the frontend and backend components are running simultaneously to use the application effectively.

Feel free to customize the setup according to your specific needs, such as choosing a different database system, configuring environment variables, or adding additional features.
