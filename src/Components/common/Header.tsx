import React from "react";
import { Card, CardHeader, Input } from "@nextui-org/react";
import ImageConst from "./../../Constants/ImageConst";
import ColorConst from "./../../Constants/ColorConstant";
import FontConst from "./../../Constants/FontConstant";
import { useAppSelector } from "./../../store/hooks";
import { selectedUser } from "./../../store/slices/adminSlice";
import {  Box } from "@mui/material";

const Header = () => {
  const userDetails: any = useAppSelector(selectedUser);
  return (
    <div
      style={{
        height: "max-content",
        width: "auto",
        display: "flex",
        flexDirection: "row",
        gap: "10%",
        position: "static",
        padding: "16px 48px",
      }}
    >
      <Card>
        <CardHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              rowGap: "20px",
              color: ColorConst.fontBlack,
              fontWeight: FontConst.FONTWEIGHT_700,
              fontSize: FontConst.FONTSIZE_36,
              "@media only screen and (max-width: 1919px)": {
                fontWeight: FontConst.FONTWEIGHT_600,
                fontSize: FontConst.FONTSIZE_36,
              },
              /* Large Screens */
              "@media only screen and (max-width: 1439px)": {
                fontWeight: FontConst.FONTWEIGHT_600,
                fontSize: FontConst.FONTSIZE_32,
              },
              /* Medium Screens */
              "@media only screen and (max-width: 1280px)": {
                fontWeight: FontConst.FONTWEIGHT_500,
                fontSize: "28px",
              },
              /* Small Screens */
              "@media only screen and (max-width: 1024px)": {
                fontWeight: FontConst.FONTWEIGHT_500,
                fontSize: "28px",
              },
            }}
          >
            {`Hello, ${
              userDetails[0]?.username ? userDetails[0]?.username : "user"
            }`}
            <div>
              <img
                src={ImageConst?.emoji}
                alt="emoji"
                style={{ width: "32px", height: "32px" }}
              />
            </div>
          </Box>
          <p
            style={{
              color: ColorConst.fontBlackMini,
              fontWeight: FontConst.FONTWEIGHT_400,
              fontSize: FontConst.FONTSIZE_16,
            }}
          >
            Here some reports on your dashboard
          </p>
        </CardHeader>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "0px 0px 0px auto",
        }}
      >
        <Box
          sx={{
            width: "420px",
            margin: "0px 10px 0px 0px",
            "@media only screen and (max-width: 1919px)": {
              width: "380px",
            },
            /* Large Screens */
            "@media only screen and (max-width: 1439px)": {
              width: "320px",
            },
            /* Medium Screens */
            "@media only screen and (max-width: 1280px)": {
              width: "280px",
            },
            /* Small Screens */
            "@media only screen and (max-width: 1024px)": {
              width: "250px",
            },
            "@media only screen and (max-width: 850px)": {
              width: "250px",
            },
            "@media only screen and (max-width: 768px)": {
              width: "250px",
            },

          }}
        >
          <Input
            // type="email"
            variant="flat"
            placeholder=" Type to Search"
            style={{
              width: "100%",
              height: "42px",
              borderRadius: "12px",
              border: `1px solid transparent`,
              background: ColorConst.primaryGray,
            }}
          />

          {/* <Divider  style={{color:ColorConst.primaryGray, height:"49px"}}/> */}
        </Box>
        <Box>
          <div
            style={{
              height: "30px",
              background: ColorConst.primaryGray,
              border: "1px solid transparent",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <img
              src={ImageConst?.bell}
              alt="emoji"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
        </Box>
      </Box>

      <div>
        <Card
          style={{
            borderRadius: "14px",
            background: "transparent",
            border: `1px solid ${ColorConst.primaryGray}`,
            padding: "16px",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <img
            src={ImageConst?.person}
            alt="emoji"
            style={{ width: "48px", height: "48px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              "@media only screen and (max-width: 1024px)": {
display:"none"              },
            }}
          >
            <div
              style={{
                color: ColorConst.fontBlack,
                fontWeight: FontConst.FONTWEIGHT_400,
                fontSize: FontConst.FONTSIZE_16,
              }}
            >
              {/* {`${userDetails[0]?.first_name} ${userDetails[0]?.last_name}`} */}
              {`${userDetails[0]?.username ? userDetails[0]?.username : "user"}`}
            </div>
            <div
              style={{
                color: ColorConst.fontGray,
                fontWeight: FontConst.FONTWEIGHT_400,
                fontSize: FontConst.FONTSIZE_12,
              }}
            >
              Admin
            </div>
          </Box>
          <Box
            sx={{
              background: ColorConst.primaryGray,
              border: "1px solid transparent",
              borderRadius: "8px",
              padding: "10px",
              "@media only screen and (max-width: 1024px)": {
             display:"none"
               },
            }}
          >
            <img
              src={ImageConst?.right_arrow}
              alt="emoji"
              style={{ width: "20px", height: "20px" }}
            />
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default Header;
