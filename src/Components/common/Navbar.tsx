import React from "react";
import ImageConst from "./../../Constants/ImageConst";
// import { Button } from "@nextui-org/react";
import ColorConst from "./../../Constants/ColorConstant";
import supabase from "./../../libs/SupabaseClient";
import { useNavigate } from "react-router-dom";
import {Button } from "@mui/material";

import AppConst from "./../../Constants/AppConstant";

const Navbar = () => {
  // const [value, setValue] = useState(0); // Set default selected tab index

  const navigate = useNavigate();
  const NavbarOptions: any = [
    { icon: ImageConst.dashboard, title: "Dashboard", key: "" },
    { icon: ImageConst.user, title: "Users", key: "users" },
    { icon: ImageConst.space, title: "Spaces", key: "spaces" },
  ];

  const handleChange = (event: any, newValue: any) => {
    // setValue(newValue);
    navigate(`/dashboard/${event?.key}`);
  };

  // used to handle signOut
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem("token");
      navigate(AppConst.logIn);
    } else {
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100%",
        backgroundColor: ColorConst.brown,
        width: "120px",
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "30% 30% 0% 30%",
        }}
      >
        <img
          src={ImageConst.Rukkor_logo}
          alt="Mail Logo"
          style={{ width: "48px", height: "48px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // textAlign: "center",
          padding: "20% 7%",
        }}
      >
        {NavbarOptions?.map((item: any, index: any) => {
          return (
            <Button
            disableRipple
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  opacity: "0.7",
                },
                backgroundColor:
                  item?.key === window.location?.pathname.split("/")[2]
                    ? ColorConst?.primaryGray
                    : "transparent",
                border: "1px solid transparent !important",
                borderRadius: "12px",
                marginTop: "10px",
                // padding: "10% 15%",
              }}
              onClick={(e) => {
                handleChange(item, index);
              }}
            >
              {" "}
              <div
                key={item.title}
                style={{
                  backgroundColor: "beige",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  cursor: "pointer",
                  background: "none",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item?.icon}
                  alt="icon"
                  style={{ width: "20px", height: "16px" }}
                />
                <span style={{ color: ColorConst.fontGray }}>
                  {item?.title}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
      <div
        style={{
          padding: "20% 5%",
          marginTop: "auto",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
        }}
      >
        <Button
          onClick={() => {
            handleSignOut();
          }}
          sx={{
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",

            border: "1px solid transparent",
            "&:hover": {
              opacity: "0.7",
              backgroundColor: ColorConst?.primaryGray,
            },
          }}
        >
          <img
            src={ImageConst.signOut}
            alt="Mail Logo"
            style={{ width: "16px", height: "16px" }}
          />
          <span style={{ color: ColorConst.fontGray }}>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
