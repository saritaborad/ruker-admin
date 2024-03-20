import React, { useRef } from "react";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import {useMediaQuery} from '@mui/material';

const OtpInputField = (props: any) => {
  const graterThan1024 = useMediaQuery('(min-width:1025px)')
  const lessThan1920 = useMediaQuery('(max-width:1920px)')
  const inputRefs: any = useRef([]);
  // const handleInputFocus = (index: any) => {
  //   inputRefs && inputRefs?.current && inputRefs?.current[index]?.select();
  // };
  const handleKeyDown = (event: any, index: any) => {
    if (event.key === "ArrowRight" && index < props?.code?.length - 1) {
      inputRefs.current[index + 1].focus();
      event.preventDefault();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
      event.preventDefault();
    } else if (event.key === "Backspace" && index > 0) {
      // If Backspace is pressed and not in the first input box
      props?.handleInputChange({ value: "" }, index);
      inputRefs.current[index - 1].focus();
      event.preventDefault();
    } else if (event.key === "Backspace" && index === 0) {
      // If Backspace is pressed in the first input box
      props?.handleInputChange({ value: "" }, index);
    }
  };
  const handlePaste = (event: any) => {
    const pastedData = event.clipboardData.getData("text/plain").trim();

    const parsedPastedData = pastedData
      ?.split("")
      .slice(0, props?.code?.length);

    if (parsedPastedData?.length === props?.code?.length) {
      parsedPastedData?.forEach((char: any, index: any) => {
        if (!isNaN(char)) {
          props?.handleInputChange({ value: char }, index);
        }
      });
    }
    inputRefs.current[inputRefs.current.length - 1]?.focus();

    event.preventDefault();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-evenly",
        gap: graterThan1024 ? "8px" : "3px",
        width: "100%",
        height: lessThan1920 ?  "60px" : "80px",
       
      }}
    >
      {props?.code?.map((data: any, index: any) => {
        return (
          <input
            type="text"
            maxLength={1}
            key={index}
            style={{
              flex:1,
              textAlign:"center",
              width: "12%",
              height: lessThan1920 ?  "50px" : "auto",
              margin: "0px !important",
              padding: "0px 12px 0px",
              fontSize: graterThan1024 ?  FontConstant.FONTSIZE_24 :  FontConstant.FONTSIZE_14 ,
              fontWeight: FontConstant.FONTWEIGHT_500,
              borderRadius: "12px",
              border: `2px solid ${ColorConstant.borderGray}`,

              /* Large Screens */
            }}
            value={data}
            onChange={(e) => props?.handleInputChange(e?.target, index)}
            // onFocus={(e) => e.target.select}
            autoFocus={index === 0}
            onKeyDown={(e: any) => handleKeyDown(e, index)}
            // onFocus={() => handleInputFocus(index)}
            onPaste={handlePaste}
            ref={(inputRef: any) => (inputRefs.current[index] = inputRef)}
          />
        );
      })}
    </div>
  );
};

export default OtpInputField;
