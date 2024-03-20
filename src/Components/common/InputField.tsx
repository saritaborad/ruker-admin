import React from "react";
import { Input } from "@nextui-org/react";
import ColorConstant from "./../../Constants/ColorConstant";
import ImageConst from "./../../Constants/ImageConst";
import {useMediaQuery} from '@mui/material';

const InputField = (prop: any) => {
  const lessThan1024 = useMediaQuery('(max-width:1024px)')
  const lessThan800 = useMediaQuery('(max-width:800px)')
  
  return (
    <>
      <Input
      value={prop?.val}
        maxLength={ 
              prop?.type?.name === "newPassword" ||
              prop?.type?.name === "confirmpassword" ? "20": prop?.type?.name==="mobile"? "10": "undefined"}
        autoComplete="true"
        {...prop?.type}
        variant="bordered"
        type={
          prop?.type?.name === "password" ||
          prop?.type?.name === "newPassword" ||
          prop?.type?.name === "confirmpassword"
            ? prop.isVisible
              ? "text"
              : "password"
            :"undefined"
        }
        placeholder={prop?.placeholder}
        style={{
          fontFamily: "Roboto",
          width: "85.5%",
          // width: `calc(94% + 10px)`,

          height: lessThan1024 ?  "40px" : "54px",
          borderRadius: "12px",
          border: `1px solid ${ColorConstant.borderGray}`,
          marginTop: lessThan1024 ?  "0px" : "8px",
          paddingLeft: lessThan1024 ? "15px" : "25px",
          paddingRight: (prop?.type?.name === "password" ||
          prop?.type?.name === "newPassword" ||
          prop?.type?.name === "confirmpassword") ? "45px" : lessThan1024 ? "15px" :  "25px",
          ...prop?.st
        }}
    endContent= {prop?.type?.name === "password" ||
      prop?.type?.name === "newPassword" ||
      prop?.type?.name === "confirmpassword" ? (
        <div
          style={{
            position: "absolute",
            right:  window?.location?.pathname==='/register'? 30: 15,
            top: lessThan1024 ?  "32px" : "34px",
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
        >
          {prop?.isVisible ? (
            <img
              src={ImageConst?.eyeIconVisible}
              alt="eye"
              onMouseDown={() => {
                prop?.toggleVisibility();
              }}
            />
          ) : (
            <img
              src={ImageConst?.eyeIcon}
              alt="eye-visible"
              onMouseDown={() => {
                prop.toggleVisibility();
              }}
            />
          )}
        </div>
      ) : null}
      />
    </>
  );
};

export default InputField;
