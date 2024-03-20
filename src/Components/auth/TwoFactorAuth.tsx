import React, { useState,useCallback } from "react";
// import ImageConst from "./../../Constants/ImageConst";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppConstant from "./../../Constants/AppConstant";
import { ActiveUser } from "./../../store/slices/adminSlice";
import { useAppDispatch } from "./../../store/hooks";
import Button from "./../common/Button";

import QRCode from "react-qr-code";
// import AppConstant from "./../../Constants/AppConstant";
import supabase from "./../../libs/SupabaseClient";
import { toast } from "react-toastify";
import OtpInputField from "./../common/OtpInputField";
import {Box, useMediaQuery } from "@mui/material";
import "./index.css";

const TwoFactorAuth = () => {
  const graterThan1024 = useMediaQuery('(min-width:1025px)')
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParamsData = location.state?.mfaResult;
  const searchUserDetails = location.state?.email;  
  const navigate = useNavigate();
  const getUserDetails =  useCallback(async () => {
    const { data, error } = await supabase
      .from("user")
      .select()
      .eq("primary_email", searchUserDetails);
    if (error) {
      return;
    } else {
      dispatch(ActiveUser(data));
    }

  },
  [dispatch,searchUserDetails]
  );
  // used for verify challenge on submit
  const HandleVerification = async (values: any) => {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: searchParamsData?.id,
      code: values,
    });

    if (data) {
      if (data) {
       await getUserDetails()
        toast.success("Verified! Sign-In successfully!");
        navigate(AppConstant.homePage);
      } else {
        if (error === "AuthApiError: Invalid TOTP code entered")
          toast.error(`Invalid TOTP code entered!`);
        return;
      }
    } else {
      if (code?.join("")?.length !== 6) {
        toast.error("please enter 6-digit valid TOTP code!");

        return;
      } else {
        toast.error(`Invalid TOTP code entered!`);

        return;
      }
    }
  };
  const handleInputChange = (element: any, index: any) => {
    if (isNaN(element?.value)) return false;

    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = element?.value;
      return newCode;
    });
    if (element?.nextSibling) {
      element?.nextSibling?.focus();
    }
  };
  return (
    <>
      <Box
        sx={{
          width:"100%",
          // height:"100%",
          // padding: "182px 80px",
          padding: "13% 13%",
          display:"flex",alignItems:"center",
          "@media only screen and (max-width: 1919px)": {
            // padding: "18% 18%",
          },
          "@media only screen and (max-width: 1800px)": {
            // padding: "18% 18%",
            // width:"600px",
          },

          /* Large Screens */
          "@media only screen and (max-width: 1439px)": {
            padding: "10% 10%",
            // width:"490px",
          },

          /* Medium Screens */
          "@media only screen and (max-width: 1280px)": {
            // padding: "12% 12%",
          },

          /* Small Screens */
          "@media only screen and (max-width: 1023px)": {
            // padding: "6% 10%",
            // width:"365px"
          },
          "@media only screen and (max-height: 870px) ": {
            // padding: "6% 7%",
          },
          "@media only screen and (max-height: 750px) ": {
            // padding: "5% 7%",
          },
          "@media only screen and (max-height: 600px) ": {
            // padding: "5% 7%",
          },
          border: "1px solid transparent",
          borderRadius: "30px",
          background: ColorConstant.white,
          // width: "422px",
          boxSizing: "border-box",
        }}
      >
        <Box>
          <Box
            sx={{
              fontSize: FontConstant.FONTSIZE_36,
              fontWeight: FontConstant.FONTWEIGHT_600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              "@media only screen and (max-width: 1919px)": {
                fontSize: FontConstant.FONTSIZE_30,
                fontWeight: FontConstant.FONTWEIGHT_600,
              },

              /* Large Screens */
              "@media only screen and (max-width: 1439px)": {
                fontSize: FontConstant.FONTSIZE_24,
                fontWeight: FontConstant.FONTWEIGHT_600,
              },

              /* Medium Screens */
              "@media only screen and (max-width: 1280px)": {
                fontSize: FontConstant.FONTSIZE_24,
                fontWeight: FontConstant.FONTWEIGHT_600,
              },

              /* Small Screens */
              "@media only screen and (max-width: 1024px)": {
                fontSize: FontConstant.FONTSIZE_20,
                fontWeight: FontConstant.FONTWEIGHT_600,
              },
            }}
          >
            2fa Authentication
          </Box>
          <Box
            // className="text-tiny"
            sx={{
              marginTop: "15px",
              fontWeight: FontConstant.FONTWEIGHT_500,
              fontSize: FontConstant.FONTSIZE_20,
              letterSpacing: "0.02em",
              fontFamily: "Roboto-medium",
              "@media only screen and (max-width: 1919px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_18,
                marginTop: "10px",
              },

              /* Large Screens */
              "@media only screen and (max-width: 1439px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_18,
                marginTop: "7px",
              },

              /* Medium Screens */
              "@media only screen and (max-width: 1280px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_16,
              },

              /* Small Screens */
              "@media only screen and (max-width: 1024px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_14,
                marginTop: "5px",
              },
            }}
          >
            Set up two factor authentication code
          </Box>
          <Box
            // className="text-tiny"
            sx={{
              marginTop: "15px",
              fontWeight: FontConstant.FONTWEIGHT_400,
              fontSize: FontConstant.FONTSIZE_16,
              letterSpacing: "0.02em",
              "@media only screen and (max-width: 1919px)": {
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_16,
              },

              /* Large Screens */
              "@media only screen and (max-width: 1439px)": {
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_16,
              },

              /* Medium Screens */
              "@media only screen and (max-width: 1280px)": {
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_14,
              },

              /* Small Screens */
              "@media only screen and (max-width: 1024px)": {
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: "13px",
              },
            }}
          >
            To be able to login you need to scan QR code with your
                       authentication app and enter authentication code below
          </Box>
          <div
            style={{
              marginTop: graterThan1024 ? "20px" : "15px",
              width: graterThan1024 ? "212px" : "150px",
              borderBottom: `4px solid ${ColorConstant.Orange}`,
              borderRadius: "12px",
            }}
          ></div>

          {/* QR code */}
          <Box
            sx={{
              marginTop: graterThan1024 ? "48px" :"20px",
              border: `2px solid ${ColorConstant.primaryGray}`,
              borderRadius: "14px",
              padding: "0px",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "100% !important",
              height: "200px",
              "@media only screen and (max-width: 1919px)": {
                width: "100% !important",
                height: "160px",
                margin: "15px auto 10px",
                padding: "0px",

              },

              "@media only screen and (max-width: 1439px)": {
                height: "150px !important",
                width: "100% !important",
                margin: "10px auto 0px",
                padding: "0px",

              },

              "@media only screen and (max-width: 1280px)": {
                width: "100% !important",
                height: "145px !important",
                margin: "10px auto 0px",
                padding: "0px",


              },

              "@media only screen and (max-width: 1024px)": {
                margin: "15px auto 10px",
                padding: "0px",
                width: "100% !important",
                height: "150px !important",

              },
              "@media only screen and (max-height: 750px) ": {
                boxSizing: "border-box",
                // padding: "35px 15px",
                margin: "10px auto auto !important",
                width: "100% !important",
                height: "150px",
              },
              "@media only screen and (max-height: 600px) ": {
                width: "100% !important",
                height: "140px",
                margin: "10px auto auto !important",
              },
            }}
          >
            <QRCode
              className="two-factor-qr"
              value={searchParamsData?.totp?.uri}
            />
          </Box>
          {/* code verification */}
          <Box
            // className="text-tiny"
            sx={{
              marginTop: "48px",

              fontSize: FontConstant.FONTSIZE_20,
              fontWeight: FontConstant.FONTWEIGHT_500,
              letterSpacing: "0.02em",
              fontFamily: "Roboto-medium",
              "@media only screen and (max-width: 1919px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_18,
                marginTop: "25px",
              },

              /* Large Screens */
              "@media only screen and (max-width: 1439px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_18,
                marginTop: "10px",
              },

              /* Medium Screens */
              "@media only screen and (max-width: 1280px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_16,
                marginTop: "10px",
              },

              /* Small Screens */
              "@media only screen and (max-width: 1024px)": {
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_16,
                marginTop: "10px",
              },
            }}
          >
            Enter authentication code
          </Box>

          <div style={{ marginTop: "20px" }}>
            <OtpInputField code={code} handleInputChange={handleInputChange} />
          </div>

          <Box
            onClick={() => {
              HandleVerification(code?.join(""));
            }}
            sx={{
              marginTop: "48px",
                           // width: "490px",
              "@media only screen and (max-width: 1919px)": {
                // width: "490px !important",
                marginTop: "30px",
              },

              "@media only screen and (max-width: 1439px)": {
                // width: "490px !important",
                marginTop: "20px",
              },

              "@media only screen and (max-width: 1280px)": {
                // width: "450px !important",
                marginTop: "15px",
              },

              "@media only screen and (max-width: 1024px)": {
                // width: "420px !important",
                marginTop: "15px",
              },
              "@media only screen and (max-width: 993px)": {
                // width: "420px !important",
                marginTop: "10px",
              },
            }}
          >
            <Button
              title={"Verify"}
              disable={code?.join("")?.length !== 6 ? true : false}
              st={{}}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TwoFactorAuth;
