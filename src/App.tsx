// import './App.css';
import React from "react";
// import LandingPage from "././pages/LandingPage";
import { NextUIProvider } from "@nextui-org/react";
// import { useNavigate } from "react-router-dom";
import AdminRoutes from "././routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <NextUIProvider>
        <AdminRoutes />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
        />
      </NextUIProvider>
    </div>
  );
};

export default App;
