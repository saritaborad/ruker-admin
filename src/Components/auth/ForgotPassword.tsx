import React from "react";
import ImageConst from "./../../Constants/ImageConst";
import { Image } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import { useNavigate } from "react-router-dom";
import { containsEmojis } from "./../../utils/functions/commonFunctions";
import InputField from "./../common/InputField";
import Button from "./../common/Button";
import { useAppDispatch } from "./../../store/hooks";
import { resetPassword } from "./../../store/slices/adminSlice";
import { Box ,useMediaQuery} from "@mui/material";

// import { useDispatch } from "react-redux";
import supabase from "./../../libs/SupabaseClient";
import ErrorMessage from "./../common/ErrorMessage";
import AppConstant from "./../../Constants/AppConstant";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const hLessThan1024 = useMediaQuery("(max-height:1024px)");
  const hLessThan768 = useMediaQuery("(max-height: 768px)");
  const graterThan1024 = useMediaQuery("(min-width:1025px)");

  
  const lessThan800 = useMediaQuery("(max-width:800px)");

  // Use useMediaQuery to determine the screen size

  const schema = yup
    .object({
      email: yup
        .string()
        .required("email is required.")
        .matches(/^\S+$/, "email should not contain whitespaces.")
        .test("no-emojis", "Emojis are not allowed in email.", containsEmojis)
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email address."),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const values: any = watch();
  const dispatch = useAppDispatch();

  // used to verify user email
  const handleSubmitform: any = async (props: any) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: props?.email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: false,
      },
    });
    if (error) {
      toast.error(`${error}`);
      return;
    }
    if (error == null && data?.user == null) {
      dispatch(resetPassword("reset-password"));

      navigate(AppConstant.resetPassword, {
        state: { email: props?.email },
      });
    } else {
      return;
    }
  };
  return (
    <>
       <Box
        sx={{
          border: "1px solid transparent",
          borderRadius: "30px",
          background: ColorConstant.white,
          padding: "13% 13%",
          display:"flex",alignItems:"center",
          // padding: "150px 96px 150px 96px",
          boxSizing: "border-box",
          width:'100%',
          "@media  screen and (max-width: 1919px)": {
            // padding: "18% 18%",
          },
          "@media  screen and (max-width: 1800px)": {
            // padding: "18% 18%",
            // width:'600px',
          },

          /* Large Screens */
          "@media  screen and (max-width: 1439px)  ": {
           padding: "10% 10%",
            //  width:'490px'
          },

          /* Medium Screens */
          "@media  screen and (max-width: 1280px)": {
            padding: "10% 10%",
           
          },

          /* Small Screens */
          "@media  screen and (max-width: 1023px)": {
            // padding: "10% 10%",
            // width:'365px'
          },
          "@media only screen and (max-height: 870px) ": {
            // padding: "10% 10%",
          },
          "@media only screen and (max-height: 750px) ": {
            // padding: "5% 10%",
          },
          "@media only screen and (max-height: 600px) ": {
            // padding: "7% 10%",
          },
        }}
      >
        <Box
          sx={{
            width:"100%",
            display: "flex",
            flexDirection: "column",
            // marginTop: graterThan1920 ? "20%" : graterThan1024 ? "10%" : "0px",
            gap: hLessThan768 ? "5px" : lessThan800 ? "10px" : hLessThan1024 ? "20px" : graterThan1024 ? "48px" : "20px",

            // "@media only screen and (max-height: 750px) ": {
            //   gap: "42px !important",
            // },
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
              src={ImageConst?.forgot_password}
              alt="logo"
              height={"100%"}
              width={"100%"}
            />
          </Box>
          <div
            style={{
              width: "max-content",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth:"100%"
              // paddingBottom: "5%",
              // paddingTop: "5%",
            }}
          >
            <Box
              sx={{
                marginTop:"15px",
                fontSize: FontConstant.FONTSIZE_36,
                fontWeight: FontConstant.FONTWEIGHT_600,
                letterSpacing: "0.04em",

                textTransform: "uppercase",
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
              Forgot password
            </Box>
            <Box
              sx={{
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize:  FontConstant.FONTSIZE_16,
                letterSpacing: "0.02em",
                fontFamily: "Roboto-medium",
                "@media only screen and (max-width: 1920px)": {
                  fontSize: FontConstant.FONTSIZE_14,
                                 },

                /* Medium Screens */
                // "@media only screen and (max-width: 1280px)": {
                //   fontSize: FontConstant.FONTSIZE_14,
                //                  },

                /* Small Screens */
                "@media only screen and (max-width: 1024px)": {
                  fontSize: FontConstant.FONTSIZE_12,
                               },
              }}
            >
              No worries, we'll send you reset instructions.{" "}
              <div
                style={{
                  marginTop: graterThan1024 ? "15px" : lessThan800 ? "10px" : "15px",
                  marginBottom:"15px",
                  width: graterThan1024 ? "212px" : "150px",
                  borderBottom: `4px solid ${ColorConstant.Orange}`,
                  borderRadius: "12px",
                }}
              ></div>
            </Box>
          </div>
          <form onSubmit={handleSubmit((data) => handleSubmitform(data))}>
            <div
              style={{
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: FontConstant.FONTSIZE_16,
              }}
            >
              Email
            </div>
            <Box
              sx={{
                // marginTop: "48px",
                // width: "490px",
                "@media only screen and (max-width: 1919px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1439px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1280px)": {
                  // width: "442px !important",
                },

                "@media only screen and (max-width: 1024px)": {
                  // width: "408px !important",
                },
              }}
            >
              <InputField
                type={{ ...register("email", { required: true }) }}
                placeholder={"Enter your email"}
                st={{width:"100%"}}
              />
              {errors?.email && (
                <ErrorMessage message={errors.email && errors.email.message} />
              )}
            </Box>
            {/* <div style={{ marginTop: "48px" }}> */}
            <Box
              sx={{
                marginTop: "48px",
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
                  // width: "420px !important",
                  marginTop: "24px",
                },
              }}
            >
              <Button
                title={"Reset Password"}
                disable={values?.email?.length > 0 ? false : true}
                st={{width:"100%"}}
              />
            </Box>
            {/* </div> */}
          </form>

          {/* <div
            style={{
              marginTop: "-24px",
              marginBottom: "24px",
            }}
            onClick={() => {
              navigate(AppConstant.logIn);
            }}
          > */}
          <Box
            sx={{
             
              marginBottom: "24px",
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
                // width: "420px !important",
              },
            }}
            onClick={() => {
              navigate(AppConstant.logIn);
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
          {/* </div> */}
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
