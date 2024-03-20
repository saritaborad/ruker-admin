import React from "react";
import { Navigate } from "react-router-dom";
import PATH from "./../routes/path";


const PrivateGuard = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ?  children : <Navigate to={PATH.root} />;
};


export default PrivateGuard;
