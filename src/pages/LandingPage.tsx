import React, { useEffect, useRef, useState } from "react";
import Login from "./../Components/auth/Login";
import ImageConst from "./../Constants/ImageConst";
import ColorConstant from "./../Constants/ColorConstant";
import FontConstant from "./../Constants/FontConstant";
import { useLocation } from "react-router-dom";
import ForgotPassword from "./../Components/auth/ForgotPassword";
import AppConstant from "./../Constants/AppConstant";
import StaticData from "./../static/StaticData";
import TwoFactorAuth from "./../Components/auth/TwoFactorAuth";
import ResetPassword from "./../Components/auth/ResetPassword";
import VerifyMFACode from "./../Components/auth/VerifyMFACode";
import NewPassword from "./../Components/auth/Newpassword";
import { Box, Typography, useMediaQuery } from "@mui/material";

// used fro render component as location changes
const renderComponent = (prop: any) => {
  switch (prop) {
    case AppConstant.logIn: {
      return <Login />;
    }
    case AppConstant.forgotPassword: {
      return <ForgotPassword />;
    }
    case AppConstant.twoFactorAuth: {
      return <TwoFactorAuth />;
    }
    case AppConstant.resetPassword: {
      return <ResetPassword />;
    }
    case AppConstant.newPassword: {
      return <NewPassword />;
    }
    case AppConstant.verifyMFACode: {
      return <VerifyMFACode />;
    }
    default: {
      return <Login />;
    }
  }
};
const Landingpage = () => {
  const graterThan1024 = useMediaQuery("(min-width:1025px)");
  const graterThan1920 = useMediaQuery("(min-width:1920px)");
  const lessThan993 = useMediaQuery("(max-width:993px)");
  const lessThan800 = useMediaQuery("(max-width:800px)");
  const location = useLocation();

  // const [height, setHeight] = useState<any>(0);
  // const elementRef = useRef<any>(null);

  // const getElementHeight = () => {
  //   if (elementRef.current) {
  //     const height = elementRef.current.clientHeight;
  //     setHeight(height + 50);
  //   }
  // };

  // // Call getElementHeight when the component mounts
  // useEffect(() => {
  //   getElementHeight();
  // }, []);


  return (
    <>
      <Box
        sx={{
          display: "flex",
          // height: ["/reset-password"]?.includes(location.pathname) ? "110vh" : "100vh",
          minHeight:"100vh" ,
          "@media only screen and (max-width: 1919px)": {
            // height: "100vh",
          },

          "@media only screen and (max-width: 1439px)": {
            // height: "100vh",
          },

          "@media only screen and (max-width: 1280px)": {
            // height: "100vh",
          },

          "@media only screen and (max-width: 1024px)": {
            // height: "110vh",
          },
          "@media only screen and (max-height: 760px) ": {
            // height: "110vh",
          },
          "@media only screen and (max-height: 600px) ": {
            // height: "110vh",
          },
        }}
      >
        <div
          style={{
            flex: "3",
            backgroundColor: ColorConstant.blue,
            position: "relative",
           
          }}
        >
          <div
            style={{
              backgroundImage: `url(${ImageConst?.world_map})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "absolute",
              top: "8%", //12%
              bottom: 0,
              left: "4%",
              right: 0,
              // inset: graterThan1920 ? "8% 0px 0px 4%" : "0% 0px 0px 4%",
              inset: lessThan800 ? "0% 0px 0px 2%" : "0% 0px 0px 4%",
              display:"flex",
              alignItems:"center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                margin: "16% 10%", //11% 15%
                // maxWidth: "75%",
                "@media only screen and (max-width: 1919px)": {
                margin: "16% 10%", //11% 15%
                },

                "@media only screen and (max-width: 1439px)": {
                margin: "16% 8%", //11% 15%
                },

                "@media only screen and (max-width: 1280px)": {
                margin: "18% 4%", //11% 15%
                },

                "@media only screen and (max-width: 1024px)": {
                margin: "17% 4%", //11% 15%
                },
              }}
            >
              {/* welcome to rukkor section */}
              <div
                style={{
                  maxWidth: lessThan993 ?  "70%" : "75%",
                  display: "flex",
                  flexDirection: "column",
                  gap:   lessThan800 ? "0px" : lessThan993 ? "3px" :"8px"  , //10px
                  color: ColorConstant.white,
                }}
              >
                <Typography
                  sx={{
                    // backgroundColor,
                    lineHeight: "60px",
                    fontWeight: FontConstant.FONTWEIGHT_500,
                    fontSize: FontConstant.FONTSIZE_40,
                    "@media only screen and (max-width: 1919px)": {
                      // color: "red",
                      fontSize: FontConstant.FONTSIZE_40,
                      lineHeight: "60px",
                    },

                    "@media only screen and (max-width: 1439px)": {
                      // color: "green",
                      fontSize: FontConstant.FONTSIZE_36,
                      lineHeight: "60px",
                    },

                    "@media only screen and (max-width: 1280px)": {
                      // color: "blue",
                      fontSize: FontConstant.FONTSIZE_30,
                      lineHeight: "40px",
                    },

                    "@media only screen and (max-width: 1024px)": {
                      // color: "yellow",
                      fontSize: FontConstant.FONTSIZE_24,
                      lineHeight: "35px",
                    },
                  }}
                >
                  WELCOME TO
                </Typography>

                <Box
                  sx={{
                    // fontFamily:"roboto-bold",
                    fontFamily: "Roboto-bold",
                    // fontWeight: FontConstant.FONTWEIGHT_900,
                    fontSize: FontConstant.FONTSIZE_64,
                    letterSpacing: "0.05em",
                    color: ColorConstant.Orange,
                    textTransform: "uppercase",

                    "@media only screen and (max-width: 1919px)": {
                      fontFamily: "Roboto-bold",
                      maxWidth: "100%",
                      fontSize: [
                        "/two-factor-authentication",
                        "/verify-authentication",
                      ]?.includes(location.pathname)
                        ? "55px"
                        : FontConstant?.FONTSIZE_48,
                    },

                    "@media only screen and (max-width: 1439px)": {
                      maxWidth: "100%",
                      fontSize: "forgot-password" === location.pathname ?  "41px"  :  [
                        "/two-factor-authentication",
                        "/verify-authentication",
                      ]?.includes(location.pathname)
                        ? "31px"
                        : FontConstant?.FONTSIZE_40,
                      fontWeight: FontConstant?.FONTWEIGHT_500,
                    },

                    "@media only screen and (max-width: 1280px)": {
                      letterSpacing: "0.04em",
                      fontSize: [
                        "/two-factor-authentication",
                        "/verify-authentication",
                      ]?.includes(location.pathname)
                        ? "31px"
                        : FontConstant?.FONTSIZE_36,
                      fontWeight: FontConstant?.FONTWEIGHT_500,
                      // maxWidth: "70%",
                    },

                    "@media only screen and (max-width: 1024px)": {
                      letterSpacing: "0.04em",
                      fontSize: [
                        "/two-factor-authentication",
                        "/verify-authentication",
                      ]?.includes(location.pathname)
                        ? "29px"
                        : FontConstant?.FONTSIZE_30,
                      fontWeight: FontConstant?.FONTWEIGHT_500,
                      // maxWidth: "60%",
                      // maxWidth: "max-content",
                    },

                    "@media only screen and (max-height: 760px) ": {
                      letterSpacing: "0.04em",
                      // fontSize: FontConstant?.FONTSIZE_36,
                      fontWeight: FontConstant?.FONTWEIGHT_500,
                    },
                    "@media only screen and (max-height: 600px) ": {
                      letterSpacing: "0.04em",
                      // fontSize: FontConstant?.FONTSIZE_36,
                      fontWeight: FontConstant?.FONTWEIGHT_500,
                    },
                  }}
                >
                  <StaticData data={location.pathname} />
                </Box>
                <Box
                  sx={{
                    fontWeight: FontConstant.FONTWEIGHT_500,
                    lineHeight: "24px",
                      "@media only screen and (max-width: 1919px)": {
                      fontSize: FontConstant.FONTSIZE_16,
                      maxWidth: "90%",
                    },

                    /* Large Screens */
                    "@media only screen and (max-width: 1439px)": {
                      fontSize: FontConstant.FONTSIZE_16,
                      // maxWidth: "70%",
                    },

                    /* Medium Screens */
                    "@media only screen and (max-width: 1280px)": {
                      fontSize: FontConstant.FONTSIZE_14,
                      // maxWidth: "65%",
                    },

                    /* Small Screens */
                    "@media only screen and (max-width: 1024px)": {
                      fontSize: FontConstant.FONTSIZE_14,
                      // maxWidth: "89%",
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Diam ultrices etiam
                  pharetra enim ut tortor pretium tellus.Lacus varius enim
                  feugiat enim tellus bibendum cras nisi. Mi morbi odio volutpat
                  diam ultricies tincidunt feugiat. Egestas nunc eget euismod
                  molestie enim. Pharetra consequat quis faucibus mattis nunc.
                  Morbi enim viverra viverra amet amet lorem vitae at integer.
                  Facilisis luctus tortor sed facilisis turpis. Maecenas netus
                  odio integer cum velit ullamcorper donec amet.
                  <p style={{marginTop:"0px"}}>
                    Lorem ipsum dolor sit amet consectetur. Suspendisse
                    malesuada gravida vitae lacus urna eget. Sem fermentum at
                    justo venenatis tellus.
                  </p>
                </Box>
              </div>
              {/* welcome section ends */}
            </Box>
          </div>
        </div>
        <div style={{ flex: "1.2", backgroundColor: ColorConstant?.primaryGray }}>
          <div
          // ref={elementRef}
            style={{
              display: "flex",
              flexWrap: "wrap",
              position: "absolute",
              top: "5%",
              bottom: "5%",
              // right: lessThan800 ? "10%" : graterThan1024 ? "10%" : "8%",
              right: lessThan800 ? "4%" : graterThan1920 ? "6%" :  "6%",
              width: lessThan993 ? "365px" : "35%"
              ,height: window.innerHeight > window.innerWidth ? "80%" : "90%"
            }}
          >
            {renderComponent(location.pathname)}
          </div>
        </div>
      </Box>
      {/* <Box sx={{height:"3%"}}></Box> */}
    </>
  );
};

export default Landingpage;
