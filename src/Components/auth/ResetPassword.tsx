import React, { useEffect, useState } from "react";
import ImageConst from "./../../Constants/ImageConst";
import { Image } from "@nextui-org/react";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import AppConstant from "./../../Constants/AppConstant";
import supabase from "./../../libs/SupabaseClient";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./../common/Button";
import {
  newPassword,
  selectResetPassword,
} from "./../../store/slices/adminSlice";
import { useAppDispatch } from "./../../store/hooks";

import { disableBrowserBackButton } from "./../../utils/functions/commonFunctions";
import { useAppSelector } from "./../../store/hooks";
import OtpInputField from "./../common/OtpInputField";
import PATH from "./../../routes/path";
import { Box, useMediaQuery } from "@mui/material";

const ResetPassword = () => {

  const graterThan1920 = useMediaQuery("(min-width:1920px)");
  const graterThan1024 = useMediaQuery("(min-width:1025px)");
  const lessThan800 = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const location = useLocation();
  const searchParamsData = location.state?.email;
  const isResetPasswordStep: any = useAppSelector(selectResetPassword);

  const dispatch = useAppDispatch();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // used for submit reset password
  const handleSubmitform: any = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: searchParamsData,
      token: code?.join(""),
      type: "email",
    });

    if (error) {
      toast.error(`${error}`);
      return;
    } else {
      if (data?.user) {
        dispatch(newPassword("new-password"));
        navigate(AppConstant.newPassword);
      }
    }
  };
  useEffect(() => {
    disableBrowserBackButton();
  }, []);
  // used to handle resend code
  const handleResendPassword = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: searchParamsData,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error == null && data?.user == null) {
      toast.success("Resend code successfully. please check your mail.");
    } else {
      return;
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
      {isResetPasswordStep === "reset-password" ? (
        <Box
          sx={{
            // height:"100%",
            // padding: "182px 80px",
            width: "100%",
            padding: "13% 13%",
            display:"flex",
            alignItems:"center",
            "@media only screen and (max-width: 1919px)": {
              // padding: "18% 18%",
            },
            "@media only screen and (max-width: 1800px)": {
              // width: "600px",
            },

            /* Large Screens */
            "@media only screen and (max-width: 1440px)": {
              padding: "10% 10%",
              // width: "490px",
            },

            /* Medium Screens */
            "@media only screen and (max-width: 1280px)": {
              // padding: "12% 13%",
            },

            /* Small Screens */
            "@media only screen and (max-width: 1023px)": {
              padding: "10% 10%",
              // width: "365px",
            },
            "@media only screen and (max-height: 870px) ": {
              // padding: "5% 10%",
            },
            "@media only screen and (max-height: 760px) ": {
              // padding: "5% 10%",
            },
            "@media only screen and (max-height: 600px) ": {
              // padding: "4% 10%",
            },
            border: "1px solid transparent",
            borderRadius: "30px",
            background: ColorConstant.white,
            // width: "422px",
            boxSizing: "border-box",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              // marginTop: graterThan1920 ? "20%" : "0px",
            }}
          >
            <Box
              height={"96px"}
              width={"96px"}
              sx={{
                "@media only screen and (max-width: 1919px)": {
                  height: "75px",
                  width: "75px",
                },

                /* Large Screens */
                "@media only screen and (max-width: 1439px) ": {
                  height: "65px",
                  width: "65px",
                },

                /* Medium Screens */
                "@media only screen and (max-width: 1280px) ": {
                  height: "60px",
                  width: "60px",
                },

                /* Small Screens */
                "@media only screen and (max-width: 1024px) ": {
                  height: "55px",
                  width: "55px",
                },
                "@media only screen and (max-width: 800px) ": {
                  height: "50px",
                  width: "50px",
                },
              }}
            >
              <Image
                src={ImageConst?.reset_password}
                alt="logo"
                height={"100%"}
                width={"100%"}
              />
            </Box>
            <Box
              sx={{
                marginTop: graterThan1920 ? "48px" : "20px",
                fontSize: FontConstant.FONTSIZE_36,
                fontWeight: FontConstant.FONTWEIGHT_600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                "@media only screen and (max-width: 1919px)": {
                  fontSize: FontConstant.FONTSIZE_32,
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
              Password reset
            </Box>

            <Box
              // className="text-tiny"
              sx={{
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_16,
                letterSpacing: "0.02em",
                fontFamily: "Roboto-medium",
                lineHeight: "24px",
                // maxWidth:"80%",
                marginTop: "15px",

                "@media only screen and (max-width: 1919px)": {
                  fontWeight: FontConstant.FONTWEIGHT_400,
                  fontSize: FontConstant.FONTSIZE_14,
                },

                /* Large Screens */
                "@media only screen and (max-width: 1439px)": {
                  fontWeight: FontConstant.FONTWEIGHT_400,
                  fontSize: FontConstant.FONTSIZE_14,
                },

                /* Medium Screens */
                "@media only screen and (max-width: 1280px)": {
                  fontWeight: FontConstant.FONTWEIGHT_400,
                  fontSize: FontConstant.FONTSIZE_14,
                },

                /* Small Screens */
                "@media only screen and (max-width: 1024px)": {
                  fontWeight: FontConstant.FONTWEIGHT_400,
                  fontSize: FontConstant.FONTSIZE_12,
                },
              }}
            >
              We have sent a code on your registered email info@rukor.com.
              Please check and enter it in below.{" "}
            </Box>
            <div
              style={{
                marginTop: graterThan1024 ? "15px" : lessThan800 ? "10px" : "15px",
                marginBottom:"15px",
                width: graterThan1024 ? "212px" : "150px",
                borderBottom: `4px solid ${ColorConstant.Orange}`,
                borderRadius: "12px",
              }}
            ></div>

            {/* QR code */}

            {/* code verification */}
            <Box
              // className="text-tiny"
              sx={{
                marginTop: "30px",

                fontSize: FontConstant.FONTSIZE_20,
                fontWeight: FontConstant.FONTWEIGHT_500,
                letterSpacing: "0.02em",
                fontFamily: "Roboto-medium",
                "@media only screen and (max-width: 1919px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_18,
                  marginTop: "22px",
                },

                /* Large Screens */
                "@media only screen and (max-width: 1439px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_18,
                  marginTop: "20px",
                },

                /* Medium Screens */
                "@media only screen and (max-width: 1280px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_16,
                  marginTop: "5px",
                },

                /* Small Screens */
                "@media only screen and (max-width: 1024px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_14,
                  marginTop: "0px",
                },
              }}
            >
              Enter authentication code
            </Box>

            <form onSubmit={handleSubmit(() => handleSubmitform())}>
              <div style={{marginTop:  graterThan1024 ? "20px" : "10px",  }}>
                <OtpInputField
                  code={code}
                  handleInputChange={handleInputChange}
                />
                <div
                  style={{
                    marginTop: "8px",
                    fontWeight: FontConstant.FONTWEIGHT_400,
                    fontSize: FontConstant.FONTSIZE_14,
                    // color: ColorConstant.Orange,
                    lineHeight: "21px",
                    float: "right",
                    // cursor: "pointer",
                  }}
                >
                  Don’t receive the email?{" "}
                  <span
                    style={{
                      color: ColorConstant.Orange,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleResendPassword();
                    }}
                  >
                    Click to Resend
                  </span>
                </div>
              </div>

              <Box
                sx={{
                  marginTop:"58px" ,
                  // width: "490px",
                  "@media only screen and (max-width: 1919px)": {
                    // width: "490px !important",
                  },

                  "@media only screen and (max-width: 1439px)": {
                    // width: "490px !important",
                  },

                  "@media only screen and (max-width: 1280px)": {
                    // width: "450px !important",
                  },

                  "@media only screen and (max-width: 1024px)": {
                    marginTop:"45px"
                  },
                  "@media only screen and (max-width: 993px)": {
                   marginTop:"35px"
                  },
                }}
              >
                <Button
                  title={"Continue"}
                  disable={code?.join("")?.length !== 6 ? true : false}
                  st={{ width: "100%" }}
                />
              </Box>
            </form>
            <Box
              onClick={() => {
                navigate(AppConstant.logIn);
              }}
              sx={{
                marginTop: "24px",
                               // width: "490px",
                "@media only screen and (max-width: 1919px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1439px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1280px)": {
                  // width: "450px !important",
                },

                "@media only screen and (max-width: 1024px)": {
                  marginTop: "20px",
                },
              }}
            >
              <Button
                title={" Back to Login"}
                disable={false}
                st={{}}
                type={2}
                startContent={
                  <img
                    src={ImageConst.back_icon}
                    alt="back"
                    style={{ marginRight: "5px" }}
                  />
                }
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Navigate to={PATH?.root} />
      )}
    </>
  );
};

export default ResetPassword;
