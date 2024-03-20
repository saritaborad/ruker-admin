import React, { useState, useEffect } from "react";
import ImageConst from "./../../Constants/ImageConst";
import { Image } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import { useNavigate } from "react-router-dom";
import AppConstant from "./../../Constants/AppConstant";
import supabase from "./../../libs/SupabaseClient";
import { toast } from "react-toastify";
import ErrorMessage from "./../common/ErrorMessage";
import Button from "./../common/Button";

import { encrypt } from "./../../utils/functions/enc-dec";
import {
  selectFactorId,
  userFactorId,
  resetPassword,
  newPassword,
  newStep,
} from "./../../store/slices/adminSlice";
import { useAppDispatch } from "./../../store/hooks";

import { useAppSelector } from "./../../store/hooks";
import {
  containsEmojis,
  disableBrowserBackButton,
} from "./../../utils/functions/commonFunctions";
import Tooltips from "./../common/Tooltips";
import InputField from "./../common/InputField";
import { EncryptData } from "./../../utils/functions/enc-dec";
import { Box, useMediaQuery } from "@mui/material";
export const Login = () => {
  // const [windowWidth, setWidth] = useState(window.innerWidth);
  // const [windowHeight, setHeight] = useState(window.innerHeight);

  // const updateSize = () => {
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', updateSize);
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);

  const hLessThan1024 = useMediaQuery("(max-height:1024px)");
  const hLessThan768 = useMediaQuery("(max-height: 768px)");
  const graterThan1024 = useMediaQuery("(min-width:1025px)");
  const lessThan1920 = useMediaQuery("(max-width:1920px)");
  const lessThan993 = useMediaQuery("(max-width:993px)");
  const lessThan800 = useMediaQuery("(max-width:800px)");
  const schema = yup
    .object({
      email: yup
        .string()
        .required("email is required.")
        .matches(/^\S+$/, "email should not contain whitespaces.")
        .test("no-emojis", "Emojis are not allowed in email.", containsEmojis)
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email address."),
      password: yup
        .string()
        .required("password is required.")
        .matches(/^\S+$/, "no white spaces allowed.")
        .min(8, "Must Contain 8 Characters.")
        // .max(19, "password can be the max. length of 20 characters.")
        .test(
          "no-emojis",
          "Emojis are not allowed in password.",
          containsEmojis
        ),
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { password: undefined, email: undefined },
    resolver: yupResolver(schema),
  });

  const values = watch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const mfaFactorId: [] = useAppSelector(selectFactorId);
  let UserId: any;
  let userUniqueId: any;
  let encryptedData: any;
  const toggleVisibility: any = () => {
    setIsVisible(!isVisible);
  };

  const dispatch = useAppDispatch();
  // used to verify authenticated user

  // const SignInUser = async (props: any) => {
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: props?.email,
  //     password: props?.password,
  //   });
  //   if (data) {
  //     encryptedData = encrypt({
  //       email: props?.email,
  //       password: props?.password,
  //     });

  //     return data;
  //   } else {
  //     return error;
  //   }
  // };

  // used for enroll mfa
  const mfaEnroll = async () => {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
    });

    if (data) {
      return data;
    } else {
      return error;
    }
  };

  // to get the verify user ID
  const getVerifyUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("primary_email", values?.email);
    UserId = data && data[0]?.id;
    userUniqueId = data && data[0]?.u_id;
    return data;
  };
  useEffect(() => {
    localStorage?.removeItem("token");
    dispatch(resetPassword(null));
    dispatch(newPassword(null));
    dispatch(newStep(null));
  }, [dispatch]);
  // called on user signIn
  const verifyRegisterUser = async (i: any) => {
    const { data } = await supabase
      .from("user")
      .select("primary_email")
      .eq("primary_email", `${i?.email}`);

    return data;
  };
  const verifyAdminUser = async (user: any) => {
    const { data } = await supabase
      .from("admin_user")
      .select("u_id")
      .eq("u_id", `${user?.id}`);

    return data;
  };
  const signInWithEmail = async (props: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: props?.email,
      password: props?.password,
    });

    if (user) {
      encryptedData = encrypt({
        email: props?.email,
        password: props?.password,
      });
    }
    const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    // let signInResult: any = await SignInUser(props);
    if (user !== null) {
      localStorage?.setItem("token", `${encryptedData}`);

      let registerUser = await verifyRegisterUser(user);
      if (registerUser?.length === 0) {
        await supabase
          .from("user")
          .insert([{ primary_email: `${user?.email}`, u_id: `${user?.id}` }])
          .select();
      }
      let adminUser = await verifyAdminUser(user);
      if (adminUser?.length === 0) {
        toast.error("User is not eligible for login!");
        return;
      }

      //register module
      // const checkSignUpDetails = await getVerifyUser();
      // if (
      //   checkSignUpDetails &&
      //   (checkSignUpDetails[0]?.username == null ||
      //     checkSignUpDetails[0]?.first_name == null ||
      //     checkSignUpDetails[0]?.last_name == null)
      // ) {
      //   let stepperSteps = { email: values?.email, step: 2 };
      //   dispatch(newStep(stepperSteps));
      //   navigate(AppConstant?.register, { state: { stepperSteps } });
      //   return;
      // }
      //end
      // check for mfa registed or not
      if (user?.factors) {
        if (user?.factors && data && data?.nextLevel === "aal2") {
          navigate(AppConstant?.verifyMFACode, { state: { user } });
        } else {
          let userAuthdata: any =
            mfaFactorId &&
            mfaFactorId
              ?.flat()
              ?.find((i: any) => i?.id === user?.factors?.[0]?.id);
          if (userAuthdata === undefined) {
            return;
          }

          const mfaResult: any = {
            id: userAuthdata?.id,
            totp: { uri: userAuthdata?.url },
          };
          navigate(AppConstant.twoFactorAuth, {
            state: { mfaResult, email:values?.email },
          });
        }
      } else {
        let mfaResult = await mfaEnroll();
        let obj: any = mfaResult;
        await getVerifyUser();
        const encrypted = await EncryptData(values?.password);
        const { error } = await supabase
          .from("user_authentication")
          .upsert({
            password: encrypted,
            id: UserId,
            u_id: userUniqueId,
          })
          .select();
        if (error) {
          return;
        }
        if (mfaResult) {
          dispatch(userFactorId({ id: obj?.id, url: obj?.totp?.uri }));
          navigate(AppConstant.twoFactorAuth, {
            state: { mfaResult, email: values?.email },
          });
        }
      }
    } else {
      // reset();
      // register module
      // if (error?.message === "Email not confirmed") {
      //   let stepperSteps = { email: values?.email, step: 1 };
      //   dispatch(newStep(stepperSteps));
      //   await supabase.auth.signInWithOtp({
      //     email: values?.email,
      //     options: {
      //       shouldCreateUser: false,
      //     },
      //   });

      //   navigate(AppConstant?.register, { state: { stepperSteps } });
      //   return;
      // }
      // end
      toast.error(`${error?.message}`);
      return;
    }
  };

  // Call this function to disable the back button behavior
  useEffect(() => {
    disableBrowserBackButton();
  }, []);

  return (
    <>
      <Box
        sx={{
          border: "1px solid transparent",
          borderRadius: "30px",
          background: ColorConstant.white,
          padding: "13% 13%",
          // padding: "150px 96px 150px 96px",
          boxSizing: "border-box",
          width: "100%",
          display:"flex",
          alignItems:"center",
          "@media only screen and (max-width: 1919px)": {
            // padding: "18% 18%",
          },
          /* Large Screens */
          "@media only screen and (max-width: 1800px)": {
            // padding: "15% 15%",
            // width: "600px",
          },
          "@media only screen and (max-width: 1439px)": {
            padding: "10% 10%",
            // width: "490px",
          },
          /* Medium Screens */
          "@media only screen and (max-width: 1280px)": {
            // padding: "10% 10%",
          },
          /* Small Screens */
          "@media only screen and (max-width: 1024px)": {
            padding: "10% 10%",
            // width: "365px",
          },
          "@media only screen and (max-height: 870px) ": {
            // padding: "10% 10%",
          },
          "@media only screen and (max-height: 760px) ": {
            // padding: "5% 10%",
          },
          "@media only screen and (max-height: 600px) ": {
            // padding: "4% 10%",
          },
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width:"100%",
            // marginTop: "20%",
            gap: hLessThan768 ? "5px" : lessThan800 ? "10px" : hLessThan1024 ? "20px" : graterThan1024 ? "48px" : "20px",
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
              src={ImageConst?.Rukkor_logo}
              alt="logo"
              height={"100%"}
              width={"100%"}
            />
          </Box>
          <div
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              // paddingBottom: "5%",
              // paddingTop: "5%",
            }}
          >
            <Box
              sx={{
                marginTop:"15px",
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
              login
            </Box>
            <div
              style={{
                // maxWidth:"80%",
                fontFamily: "Roboto-medium",
                fontWeight: FontConstant.FONTWEIGHT_500,
                fontSize: lessThan1920 ?  graterThan1024
                  ? FontConstant.FONTSIZE_14
                  : FontConstant.FONTSIZE_12 : FontConstant.FONTSIZE_16 ,
                letterSpacing: "0.02em",
              }}
            >
              Login into your account.
              <div
                style={{
                  marginTop: graterThan1024 ? "15px" : lessThan800 ? "10px" : "15px",
                  marginBottom:"15px",
                  width: graterThan1024 ? "212px" : "150px",
                  borderBottom: `4px solid ${ColorConstant.Orange}`,
                  borderRadius: "12px",
                }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit((data) => signInWithEmail(data))}>
            <div
              style={{
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: graterThan1024 ? FontConstant.FONTSIZE_16 : FontConstant.FONTSIZE_14,
                marginTop:"5px",
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
                  // width: "445px !important",
                },

                "@media only screen and (max-width: 1024px)": {
                  // width: "408px !important",
                },
              }}
            >
              <InputField
                st={{ width: "100%" }}
                type={{ ...register("email", { required: true }) }}
                placeholder={"Enter your email"}
              />
              {errors?.email && (
                <ErrorMessage message={errors.email && errors.email.message} />
              )}
            </Box>
            <div
              style={{
                marginTop:  graterThan1024 ? "24px" : lessThan993 ? "5px" : "10px",
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize: graterThan1024 ? FontConstant.FONTSIZE_16 : FontConstant.FONTSIZE_14,
              }}
            >
              Password{" "}
              <span
                style={{
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "row",
                  margin: "auto 5px",
                }}
              >
                {" "}
                <Tooltips />
              </span>
            </div>
            <div
              style={{
                position: "relative",
              }}
            >
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
                    // width: "445px !important",
                  },

                  "@media only screen and (max-width: 1024px)": {
                    // width: "408px !important",
                  },
                }}
              >
                <InputField
                  type={{ ...register("password", { required: true }) }}
                  placeholder={"Enter your password"}
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  toggleVisibility={toggleVisibility}
                  st={{ width: "100%" }}
                />
                <ErrorMessage
                  message={errors.password && errors?.password?.message}
                />
              </Box>
              {/* {values?.password?.length > 19 ? (
                <ErrorMessage
                  message={
                    values?.password?.length > 19 &&
                    "password can be the max. length of 20 characters."
                  }
                />
              ) : (
                <ErrorMessage
                  message={errors.password && errors?.password?.message}
                />
              )} */}
            </div>

            <div
              onClick={() => {
                navigate(AppConstant.forgotPassword);
              }}
              style={{
                marginTop: graterThan1024 ? "8px" :"0px",
                fontWeight: FontConstant.FONTWEIGHT_400,
                fontSize:   graterThan1024 ?  FontConstant.FONTSIZE_14 : FontConstant.FONTSIZE_12,
                color: ColorConstant.Orange,
                float: "right",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </div>
            <Box
              sx={{
                marginTop: graterThan1024 ? "58px"  : lessThan993 ? "35px" : "45px",
                // width: "490px",
                "@media only screen and (max-width: 1919px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1439px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1280px)": {
                  // width: "490px !important",
                },

                "@media only screen and (max-width: 1024px)": {
                  // width: "365px !important",
                },
              }}
            >
              <Button
                title={isSubmitting ? "Signing In..." : "Login"}
                disable={
                  values?.email?.length > 0 && values?.password?.length > 0
                    ? false
                    : true
                }
                st={{}}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
