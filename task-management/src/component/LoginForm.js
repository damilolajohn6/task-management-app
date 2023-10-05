import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      const { data } = response; // Access data from the response
      const { access_token } = data; // Access access_token from the data
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", username);

      // Redirect to the task page
      navigate("/task");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
