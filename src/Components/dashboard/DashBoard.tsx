import React, { useEffect } from "react";
import Navbar from "./../common/Navbar";
import Header from "./../common/Header";
import { disableBrowserBackButton } from "./../../utils/functions/commonFunctions";
import { Outlet } from "react-router-dom";
const DashBoard = () => {
  // Call this function to disable the back button behavior
  useEffect(() => {
    disableBrowserBackButton();
  }, []);
  return (
    <div>
      <div style={{ position: "fixed" }}>
        <Navbar />
      </div>
      <div style={{margin:"0px 0px 0px 120px", position:"sticky"}}>
        <Header />
        <div style={{background:"#F4F4F4"}}>
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
