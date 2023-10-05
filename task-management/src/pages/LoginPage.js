import React from "react";
import LoginForm from "../component/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <div>
        {/* <h2>Login Page</h2> */}
        <LoginForm />
        <p>
          Don't have an account? <Link to="/registration">Register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
