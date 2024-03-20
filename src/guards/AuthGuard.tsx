import React from "react";
import { Navigate } from "react-router-dom";
import PATH from "./../routes/path";
import { useAppSelector } from "./../store/hooks";
import { selectResetPassword, } from "./../store/slices/adminSlice";


const AuthGuard = ({ children }: any) => {
    const isResetPasswordStep:any = useAppSelector(selectResetPassword);

  const isAuthenticated = localStorage.getItem("token");

  return isResetPasswordStep==="reset-password" ?  children : <Navigate to={PATH.root} />;
};


export default AuthGuard;
