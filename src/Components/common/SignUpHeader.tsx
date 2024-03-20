import React from "react";
import ImageConst from "./../../Constants/ImageConst";
import FontConst from "./../../Constants/FontConstant";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppConstant from "./../../Constants/AppConstant";

const SignUpHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          borderBottom: "2px solid #EFEFEF",
          width: "100%",
          height: 114,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={5.5}>
            <div />
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={ImageConst?.Rukkor_logo}
                alt="logo"
                style={{ width: "48px", height: "48px" }}
              />
              <span
                style={{
                  fontSize: FontConst?.FONTSIZE_24,
                  fontWeight: "600",
                  marginLeft: "10px",
                }}
              >
                rukkor
              </span>
            </div>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "48px",
            }}
          >
            <div
              onClick={() => {
                navigate(AppConstant?.logIn);
              }}
              style={{
                cursor: "pointer",
                fontSize: FontConst?.FONTSIZE_16,
                fontWeight: "400",
              }}
            >
              Login
            </div>
            <div
              style={{
                fontSize: FontConst?.FONTSIZE_16,
                fontWeight: "400",
              }}
            >
              {" "}
              Need help?
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SignUpHeader;
<div
  style={{
    width: "100%",
    height: "114px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "210",
    borderBottom: "2px solid #EFEFEF",
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: "210",
      marginLeft: "250px",
    }}
  >
    <img
      src={ImageConst?.Rukkor_logo}
      alt="logo"
      style={{ width: "48px", height: "48px" }}
    />
    <span
      style={{
        fontSize: FontConst?.FONTSIZE_24,
        fontWeight: "600",
        marginLeft: "10px",
      }}
    >
      rukkor
    </span>
  </div>
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "48px",
    }}
  >
    <div>Login</div>
    <div>Need help?</div>
  </div>
  {/* <div style={{display:"flex", flexGrow:"20"}}>need help?</div> */}
</div>;
