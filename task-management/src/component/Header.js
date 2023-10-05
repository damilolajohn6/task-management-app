import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the access token from localStorage (log out)
    localStorage.removeItem("token");
    // Navigate back to the main page (login page)
    navigate("/");
  };

  // Get the logged-in username from localStorage
  const loggedInUsername = localStorage.getItem("username");

  return (
    <div className="header">
      <div>
        <h1>Task Management</h1>
      </div>
      <div className="username">
       Welcome back {loggedInUsername ? loggedInUsername : "Guest"}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
