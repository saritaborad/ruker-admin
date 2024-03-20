import React from "react";
import ColorConst from "./../../Constants/ColorConstant";
import { useMediaQuery } from "@mui/material";

const ErrorMessage = ({ message }: any) => {
  const graterThan1024 = useMediaQuery('(min-width:1025px)')

    
  return <div style={{fontSize: graterThan1024 ? "16px" : "14px", color: ColorConst?.error }}>{message}</div>;
};

export default ErrorMessage;
