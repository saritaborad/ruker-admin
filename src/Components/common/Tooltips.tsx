import React from "react";
import { Tooltip } from "@nextui-org/react";
import ImageConst from "./../../Constants/ImageConst";
import ColorConstant from "./../../Constants/ColorConstant";
const Tooltips = (props: any) => {
  return (
    <Tooltip
      style={{ color: ColorConstant.fontGray }}
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
      offset={0}
      content={
        props?.title
          ? props?.title
          : "password should contain atleast 8 characters"
      }
      placement="top-start"
    >
      <img src={ImageConst?.tooltipIcon} alt="tooltip" />
    </Tooltip>
  );
};

export default Tooltips;
