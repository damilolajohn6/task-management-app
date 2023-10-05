import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
