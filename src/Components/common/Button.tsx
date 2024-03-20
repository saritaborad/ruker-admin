import React from "react";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import {useMediaQuery} from '@mui/material';

const Button = (props: any) => {
  const lessThan1024 = useMediaQuery('(max-width:1024px)')
  return (
    <>
      <button
      type="submit"
        style={{
          position:"relative",
          backgroundColor:
            props?.type === 2 ? "transparent" : ColorConstant.Orange,
          color: props?.type === 2 ? ColorConstant.Orange : ColorConstant.white,
          width: "100%",
          height: lessThan1024 ? "44px" : "54px",
          borderRadius: "12px",
          fontSize: lessThan1024 ? FontConstant.FONTSIZE_14 : FontConstant.FONTSIZE_16,
          fontWeight: FontConstant.FONTWEIGHT_500,
          border:
            props?.type === 2
              ? " 1px solid transparent"
              : `1px solid ${ColorConstant.Orange}`,
          cursor:
            props?.type === 2
              ? "pointer"
              : props?.disable
              ? "not-allowed"
              : "pointer",
          opacity: props?.type === 2 ? "1" : props?.disable ? "0.7" : "1",
          ...props?.st
        }}
        disabled={props?.disable}
      >
        <span>{props?.startContent}</span> {props?.title} <span> {props?.endContent &&props?.endContent}</span>

      </button>
    </>
  );
};

export default Button;
