import React from "react";
import RegistrationForm from "../component/RegistrationForm";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <div>
      <div>
        {/* <h2>Registration Page</h2> */}
        <RegistrationForm />
        <p>
          Already have an account? <Link to="/">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
