import React, { useEffect, useState } from "react";
import ImageConst from "./../../Constants/ImageConst";
import { Card, CardBody, Image } from "@nextui-org/react";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import supabase from "./../../libs/SupabaseClient";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./../common/Button";
import { selectStep, newStep } from "./../../store/slices/adminSlice";
import { disableBrowserBackButton } from "./../../utils/functions/commonFunctions";
import OtpInputField from "./../common/OtpInputField";
import { useAppDispatch } from "./../../store/hooks";
import { useAppSelector } from "./../../store/hooks";
import { Box } from "@mui/material";

const VerifyUserCode = (prop: any) => {
  const { handleSubmit } = useForm();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const dispatch = useAppDispatch();
  const currentUser: any = useAppSelector(selectStep);

  // used for submit reset password
  const handleSubmitform: any = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: currentUser?.email,
      token: code?.join(""),
      type: "email",
    });

    if (error) {
      toast.error(`${error}`);
      setCode(["", "", "", "", "", ""]);

      return;
    } else {
      if (data?.user) {
        prop?.setActiveStep(prop?.activeStep + 1);
        dispatch(newStep({ email: currentUser?.email, step: 2 }));
      }
    }
  };
  useEffect(() => {
    disableBrowserBackButton();
  }, []);
  // used to handle resend code
  const handleResendPassword = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: currentUser?.email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) {
      toast.error(`${error}`);
      setCode(["", "", "", "", "", ""]);
      return;
    }
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
      <Card
        style={{
          padding: "150px 96px 150px 96px",
          boxShadow: "0 4px 6px gray",

          border: "1px solid transparent",
          borderRadius: "30px",
          background: ColorConstant.white,
          // width: "490px",
        }}
      >
        <CardBody
          style={{ display: "flex", flexDirection: "column", gap: "48px" }}
        >
          <Image
            src={ImageConst?.reset_password}
            alt="logo"
            height={"96px"}
            // radius="77.42px"
            width={"96px"}
          />
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
                fontSize: FontConstant.FONTSIZE_36,
                fontWeight: FontConstant.FONTWEIGHT_600,

                textTransform: "uppercase",
                letterSpacing: "0.04em",
                "@media only screen and (max-width: 1919px)": {
                  fontSize: FontConstant.FONTSIZE_36,
                  fontWeight: FontConstant.FONTWEIGHT_600,
                },

                /* Large Screens */
                "@media only screen and (max-width: 1439px)": {
                  fontSize: FontConstant.FONTSIZE_32,
                  fontWeight: FontConstant.FONTWEIGHT_600,
                },

                /* Medium Screens */  
                "@media only screen and (max-width: 1280px)": {
                  fontSize: FontConstant.FONTSIZE_32,
                  fontWeight: FontConstant.FONTWEIGHT_600,
                },

                /* Small Screens */
                "@media only screen and (max-width: 1024px)": {
                  fontSize: FontConstant.FONTSIZE_24,
                  fontWeight: FontConstant.FONTWEIGHT_600,
                },
              }}
            >
              Verify Password
            </Box>
            <Box
              // className="text-tiny"
              sx={{
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: FontConstant.FONTSIZE_16,
                letterSpacing: "0.02em",
                fontFamily: "Roboto-medium",
                lineHeight: "24px",
                "@media only screen and (max-width: 1919px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_16,
                },

                /* Large Screens */
                "@media only screen and (max-width: 1439px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_16,
                },

                /* Medium Screens */
                "@media only screen and (max-width: 1280px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_14,
                },

                /* Small Screens */
                "@media only screen and (max-width: 1024px)": {
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: FontConstant.FONTSIZE_14,
                },
              }}
            >
              We have sent a code on your registered email info@rukor.com.
              <br />
              Please check and enter it in below.{" "}
              <div
                style={{
                  marginTop: "20px",
                  width: "212px",
                  borderBottom: `4px solid ${ColorConstant.Orange}`,
                  borderRadius: "12px",
                }}
              ></div>
            </Box>
          </div>
          <form onSubmit={handleSubmit(() => handleSubmitform())}>
            <div>
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
              {/* <div
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
              </div> */}
            </div>

            <Box
              sx={{
                marginTop: "48px",
                width: "490px",
                "@media only screen and (max-width: 1919px)": {
                  width: "490px !important",
                  marginTop: "40px",
                },

                "@media only screen and (max-width: 1439px)": {
                  width: "490px !important",
                  marginTop: "40px",
                },

                "@media only screen and (max-width: 1280px)": {
                  width: "450px !important",
                  marginTop: "36px",
                },

                "@media only screen and (max-width: 1024px)": {
                  width: "420px !important",
                  marginTop: "32px",
                },
              }}
            >
              <Button
                title={"Continue"}
                disable={code?.join("")?.length !== 6 ? true : false}
                st={{}}
              />
            </Box>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default VerifyUserCode;
