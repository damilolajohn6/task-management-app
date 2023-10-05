import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Task from "./pages/Task";

const PrivateRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app-container App">
      <Router>
        <div className="auth">
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/task" element={<PrivateRoute element={<Task />} />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
