import React, { useCallback, useEffect, useState } from "react";
import ImageConst from "./../../Constants/ImageConst";
import { Image } from "@nextui-org/react";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
// import { useNavigate } from "react-router-dom";
// import AppConstant from "./../../Constants/AppConstant";
import supabase from "./../../libs/SupabaseClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppConstant from "./../../Constants/AppConstant";
import { toast } from "react-toastify";
import OtpInputField from "./../common/OtpInputField";
import { Box, useMediaQuery } from "@mui/material";
import { ActiveUser } from "./../../store/slices/adminSlice";
import { useAppDispatch } from "./../../store/hooks";

const VerifyMFACode = () => {

  const graterThan1024 = useMediaQuery("(min-width:1025px)");

  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const dispatch = useAppDispatch();

  //   const navigate = useNavigate();
  const searchParamsData = location.state?.user;

  const getUserDetails = useCallback(async () => {
    const { data, error } = await supabase
      .from("user")
      .select()
      .eq("primary_email", searchParamsData?.email);
    if (error) {
      return;
    } else {
      dispatch(ActiveUser(data));
    }
  }, [searchParamsData, dispatch]);
  //  used to verify the challenge
  const verifyChallenge = useCallback(
    async (values: any) => {
      const { data } = await supabase.auth.mfa.challengeAndVerify({
        factorId: searchParamsData?.factors[0]?.id,
        code: values?.join(""),
      });

      if (data) {
        return data;
      } else {
        toast.error(`Invalid TOTP code entered!`);
        return;
      }
    },
    [searchParamsData]
  );
  //   used for auto submit otp on successful verification of code
  const handleChange: any = useCallback(async () => {
    let verifiedResult = await verifyChallenge(code);
    if (verifiedResult) {
      navigate(AppConstant.homePage, { replace: true });
    }
  }, [code, verifyChallenge, navigate]);
  // const handleKeyDown = useCallback(
  //   (e: any) => {
  //     // Prevent arrow key movement if the OTP length is 6
  //     if (otp.length === 6) {
  //       e.preventDefault();
  //     }
  //   },
  //   [otp]
  // );

  // useEffect(() => {
  //   const otpInput = document.getElementById("otpInput");

  //   if (otpInput) {
  //     otpInput.addEventListener("keydown", handleKeyDown);
  //     return () => {
  //       otpInput.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }
  // }, [handleKeyDown]);
  // ======

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

  useEffect(() => {
    if (code?.join("")?.length === 6) {
      handleChange();
      getUserDetails();
    }
  }, [code, handleChange, getUserDetails]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "13% 13%",
          display: "flex",
          alignItems: "center",
          // padding: "230px 96px 96px 96px",
          border: "1px solid transparent",
          borderRadius: "30px",
          background: ColorConstant.white,
          // width: "422px",
          "@media only screen and (max-width: 1919px)": {
            // padding: "30% 18%",
          },
          "@media only screen and (max-width: 1800px)": {
            width: "600px",
          },

          /* Large Screens */
          "@media only screen and (max-width: 1439px)": {
            // padding: "30% 15%",
            width: "490px",
          },

          /* Medium Screens */
          "@media only screen and (max-width: 1280px)": {
            // padding: "20% 10%",
          },

          /* Small Screens */
          "@media only screen and (max-width: 1023px)": {
            // padding: "15% 7%",
            width: "365px",
          },
          "@media only screen and (max-height: 860px) ": {
            // padding: "15% 7%",
          },
          "@media only screen and (max-height: 760px) ": {
            // padding: "15% 7%",
          },
          "@media only screen and (max-height: 600px) ": {
            // padding: "15% 7%",
          },
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: graterThan1024 ? "40px" : "20px",
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
              src={ImageConst?.verifyCode}
              alt="logo"
              // radius="77.42px"
              height={"100%"}
              width={"100%"}
            />
          </Box>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              //   borderBottom: `4px solid ${ColorConstant.Orange}`,
              gap: "10px",
              // paddingBottom: "5%",
              // paddingTop: "5%",
            }}
          >
            <Box
              sx={{
                // fontFamily: "Roboto-medium",
                marginTop: "30px",
                fontSize: "32px",
                fontWeight: FontConstant.FONTWEIGHT_600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                "@media only screen and (max-width: 1919px)": {
                  fontSize: FontConstant.FONTSIZE_30,
                  fontWeight: FontConstant.FONTWEIGHT_600,
                  marginTop: "20px",
                },

                /* Large Screens */
                "@media only screen and (max-width: 1439px)": {
                  fontSize: FontConstant.FONTSIZE_24,
                  fontWeight: FontConstant.FONTWEIGHT_600,
                  marginTop: "20px",
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
              Authentication code
            </Box>
            <Box
              // className="text-tiny"
              sx={{
                fontFamily: "Roboto-medium",
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: graterThan1024
                  ? FontConstant.FONTSIZE_16
                  : FontConstant.FONTSIZE_14,
                letterSpacing: "0.02em",
              }}
            >
              Your account is protected by authenticator, Please check and enter
              the generated code.
              <div
                style={{
                  marginTop: graterThan1024 ? "20px" : "15px",
                  marginBottom: "15px",
                  width: graterThan1024 ? "212px" : "150px",
                  borderBottom: `4px solid ${ColorConstant.Orange}`,
                  borderRadius: "12px",
                }}
              ></div>
            </Box>
          </div>

          <Box>
            <OtpInputField code={code} handleInputChange={handleInputChange} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VerifyMFACode;
