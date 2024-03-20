import React, { useState, useEffect } from "react";
import ImageConst from "./../../Constants/ImageConst";
import { Image } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ColorConstant from "./../../Constants/ColorConstant";
import FontConstant from "./../../Constants/FontConstant";
import { Navigate, useNavigate } from "react-router-dom";
import AppConstant from "./../../Constants/AppConstant";
import supabase from "./../../libs/SupabaseClient";
import ErrorMessage from "./../common/ErrorMessage";
import InputField from "./../common/InputField";
import Button from "./../common/Button";
import { selectNewPassword } from "./../../store/slices/adminSlice";
import { toast } from "react-toastify";
import {
  containsEmojis,
  specialCharRegex,
} from "./../../utils/functions/commonFunctions";
import Tooltips from "./../common/Tooltips";
import { EncryptData } from "./../../utils/functions/enc-dec";
import { disableBrowserBackButton } from "./../../utils/functions/commonFunctions";
import { useAppSelector } from "./../../store/hooks";
import PATH from "./../../routes/path";
import { Box ,useMediaQuery} from "@mui/material";
import "./index.css";
const NewPassword = () => {
  const graterThan1024 = useMediaQuery('(min-width:1025px)')
  const hLessThan1024 = useMediaQuery("(max-height:1024px)");
  const hLessThan768 = useMediaQuery("(max-height: 768px)");

  const lessThan800 = useMediaQuery("(max-width:800px)");
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required("new password is required.")
      .matches(/^\S+$/, " no white spaces allowed.")
      .min(8, "Must Contain 8 Characters.")
      // .max(20, "password exceeds the max. length of 20 characters.")
      .test("no-emojis", "Emojis are not allowed in password", containsEmojis)
      .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character.")
      .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character.")
      .matches(/^(?=.*[0-9])/, "Must Contain One Number Character.")
      .matches(specialCharRegex, "Must Contain  One Special Case Character."),

    confirmpassword: yup
      .string()
      .required("confirm password is required.")
      .test(
        "passwords-match",
        "Your passwords do not match.",
        function (value) {
          if (this.parent.newPassword === value) {
            return true;
          } else {
            return false;
          }
        }
      ),
    // .oneOf([yup.ref("newPassword"), ""], "Your passwords do not match."),
  });

  // Call this function to disable the back button behavior
  useEffect(() => {
    disableBrowserBackButton();
  }, []);

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const values: any = watch();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmpassword, setIsVisibleConfirmpassword] =
    useState(false);
  const isNewPasswordStep: any = useAppSelector(selectNewPassword);

  // used to toggle visibility of password
  const toggleVisibility: any = () => {
    setIsVisible(!isVisible);
  };
  // used to toggle visisbility of confirm password
  const toggleVisibilityforConfirmPassword: any = () => {
    setIsVisibleConfirmpassword(!isVisibleConfirmpassword);
  };
  // used to get verified user
  const getVerifyUser = async (prop: any, password: any) => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("primary_email", prop?.email);

    let UserId: any = data && data[0]?.id;
    let userUniqueId: any = data && data[0]?.u_id;
    if (data) {
      const encrypted = await EncryptData(password?.confirmpassword);
      const { error } = await supabase
        .from("user_authentication")
        .upsert({
          password: encrypted,
          u_id: userUniqueId,
          id: UserId,
        })
        .eq("user_id", UserId)
        .select();
      if (error) {
        return;
      }
    }
  };

  // handle change password
  const handleSubmitForm: any = async (props: any) => {
    if (values?.newPassword !== values?.confirmpassword) {
      return;
    } else {
      const { data, error } = await supabase.auth.updateUser({
        password: props?.confirmpassword,
      });
      let getUserData: any = data?.user;
      if (error) {
        toast.error(`${error}`);
        return;
      } else {
        await getVerifyUser(getUserData, props);

        toast.success("Password changed successfully!.please Sign In again!");
        navigate(AppConstant?.logIn);
      }
    }
  };

  return (
    <>
  {isNewPasswordStep === "new-password" ? (
        <Box
          sx={{
            width:"100%",
            // padding: "6rem 6rem",
            display:"flex",alignItems:"center",
            padding: "12% 13%",
            // padding: "120px 96px 96px 96px",

            border: "1px solid transparent",
            borderRadius: "30px",
            background: ColorConstant.white,

            "@media only screen and (max-width: 1919px)": {
              // padding: "10% 10%",
            },
            "@media only screen and (max-width: 1800px)": {
              // padding: "10% 10%",
              // width:"600px",
            },

            /* Large Screens */
            "@media only screen and (max-width: 1439px)": {
              padding: "6% 15%",
              // width:"490px"
            },

            /* Medium Screens */
            "@media only screen and (max-width: 1280px)": {
              padding: "6% 12% !important",
            },

            /* Small Screens */
            "@media only screen and (max-width: 1023px)": {
              padding: "5% 10% !important",
              // width:"365px"
            },
            "@media only screen and (max-height: 800px) ": {
              padding: "7% 10% !important",
            },
            "@media only screen and (max-height: 870px) ": {
              padding: "5% 10% !important",
            },
            "@media only screen and (max-height: 770px) ": {
              padding: "4% 10% !important",
            },
            "@media only screen and (max-height: 600px) ": {
              padding: "4% 10% !important",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
             width:"100%",
             gap: hLessThan768 ? "5px" : lessThan800 ? "10px" : hLessThan1024 ? "20px" : graterThan1024 ? "48px" : "20px",
              "@media only screen and (max-width: 1919px)": {
                gap: "48px !important",
              },

              /* Large Screens */
              "@media only screen and (max-width: 1439px)": {
                gap: "32px !important",
              },

              /* Medium Screens */
              "@media only screen and (max-width: 1280px)": {
                gap: "32px !important",
              },

              /* Small Screens */
              "@media only screen and (max-width: 1024px)": {
                gap: "20px !important",
              },
              "@media only screen and (max-height: 800px) ": {
                gap: "20px !important",
              },
              "@media only screen and (max-height: 750px) ": {
                gap: "20px !important",
              },
              "@media only screen and (max-height: 600px) ": {
                gap: "10px !important",
              },
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
                src={ImageConst?.new_password}
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
                // borderBottom: `4px solid ${ColorConstant.Orange}`,
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
                set a new password{" "}
              </Box>
              <div
                // className="text-tiny"
                style={{
                  fontWeight: FontConstant.FONTWEIGHT_500,
                  fontSize: graterThan1024 ? FontConstant.FONTSIZE_16 :  FontConstant.FONTSIZE_12,
                  letterSpacing: "0.02em",
                  fontFamily: "Roboto-medium",
                  lineHeight: "24px",
                }}
              >
                Must be at least 8 characters.{" "}
                <div
                  style={{
                    marginTop:  "15px",
                    width: graterThan1024 ? "212px" : "150px",
                    borderBottom: `4px solid ${ColorConstant.Orange}`,
                    borderRadius: "12px",
                  }}
                ></div>
              </div>
            </div>
            <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
              <div
                style={{
                  fontWeight: FontConstant.FONTWEIGHT_400,
                  fontSize: graterThan1024 ? FontConstant.FONTSIZE_16 : FontConstant.FONTSIZE_14,
                  display: "flex",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                New Password
                <span
                  style={{
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    margin: "auto 5px",
                  }}
                >
                  {" "}
                  <Tooltips />
                </span>
              </div>
              <Box
                sx={{
                  position: "relative",
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
                  type={{ ...register("newPassword", { required: true }) }}
                  placeholder={"Enter new password"}
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  toggleVisibility={toggleVisibility}
                  st={{width:"100%"}}
                />

                {
                // values?.newPassword?.length > 20 ? (
                //   <ErrorMessage
                //     message={
                //       values?.newPassword?.length > 20 &&
                //       "password exceeds the max. length of 20 characters."
                //     }
                //   />
                // ) : (
                  <ErrorMessage
                    message={errors.newPassword && errors?.newPassword?.message}
                  />
                // )
                }
              </Box>

              <Box
                sx={{
                  marginTop: "48px",
                  fontWeight: FontConstant.FONTWEIGHT_400,
                  fontSize: graterThan1024 ? FontConstant.FONTSIZE_16 : FontConstant.FONTSIZE_14,
                  display: "flex",
                  alignSelf: "center",
                  alignItems: "center",
                  "@media only screen and (max-height: 750px) ": {
                    marginTop: "10px",
                  },
                  "@media only screen and (max-height: 600px) ": {
                    marginTop: "10px",
                  },
                  "@media only screen and (max-width: 1439px)": {
                    marginTop: "24px",
                  },
                  "@media only screen and (max-width: 1280px)": {
                    marginTop: "24px",
                  },
                  "@media only screen and (max-width: 1024px)": {
                    marginTop: "10px",
                  },
                }}
              >
                Confirm Password
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
              </Box>
              <Box
                sx={{
                  position: "relative",
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
                  type={{ ...register("confirmpassword", { required: true }) }}
                  placeholder={"Enter confirm new password"}
                  isVisible={isVisibleConfirmpassword}
                  setIsVisible={setIsVisibleConfirmpassword}
                  toggleVisibility={toggleVisibilityforConfirmPassword}
                  st={{width:"100%"}}
                />

                {
                  <ErrorMessage
                    message={
                      values?.newPassword?.length > 0 &&
                      values?.confirmpassword?.length > 0 &&
                      values?.newPassword === values?.confirmpassword
                        ? " "
                        : errors.confirmpassword &&
                          errors.confirmpassword.message
                    }
                  />
                }
              </Box>
              <Box
                sx={{
                  marginTop: "40px",
                  // width: "490px",
                  "@media only screen and (max-width: 1919px)": {
                    // width: "490px !important",
                  },

                  "@media only screen and (max-width: 1439px)": {
                    // width: "490px !important",
                  },

                  "@media only screen and (max-width: 1280px)": {
                    // width: "450px !important",
                    marginTop: "36px",
                  },

                  "@media only screen and (max-width: 1024px)": {
                    // width: "420px !important",
                    marginTop: "32px",
                  },
                }}
              >
                <Button
                  title={"Continue"}
                  disable={
                    values?.newPassword?.length > 0 &&
                    values?.confirmpassword?.length > 0
                      ? false
                      : true
                  }
                  st={{}}
                />
              </Box>
            </form>
            <Box
              onClick={() => {
                navigate(AppConstant.logIn);
              }}
              sx={{
                marginTop: "0px",
                // marginBottom: "24px",
                // width: "490px",
                "@media only screen and (max-width: 1919px)": {
                  // width: "490px !important",
                  // marginBottom: "24px",
                },

                "@media only screen and (max-width: 1439px)": {
                  // width: "490px !important",
                  // marginBottom: "0px  !important",
                },

                "@media only screen and (max-width: 1280px)": {
                  // width: "450px !important",
                  // marginBottom: "0px  !important",
                },

                "@media only screen and (max-width: 1024px)": {
                  // width: "420px !important",
                  // marginBottom: "0px  !important",
                },
                "@media only screen and (max-height: 850px) ": {
                  // marginBottom: "0px  !important",
                },
                "@media only screen and (max-height: 750px) ": {
                  // marginBottom: "0px  !important",
                },
                "@media only screen and (max-height: 600px) ": {
                  // marginBottom: "0px  !important",
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

export default NewPassword;
