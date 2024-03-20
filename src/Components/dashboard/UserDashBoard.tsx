import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ImageConst from "./../../Constants/ImageConst";
import ColorConstant from "./../../Constants//ColorConstant";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./../../store/hooks";

import {
  NavigatedFrom,
} from "./../../store/slices/adminSlice";
import Statistics from "./../common/Statistics";
const UserDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const handleNavigation = (props: any) => {
    dispatch(NavigatedFrom(true))
    navigate(`${props}`);
  };
  useEffect(()=>{
dispatch(NavigatedFrom(null))
  },[dispatch])
  return (
    <div style={{ margin: "auto 40px" }}>
      <Box>
        <Grid container spacing={3} columns={32}>
          <Grid item xs={8}>
            <Box
              onClick={() => {
                handleNavigation("spaces");
              }}
            >
              <Statistics
                title={"All Space"}
                count={900}
                icon={ImageConst?.space_icon}
                color={ColorConstant?.lightBlue}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              onClick={() => {
                handleNavigation("users");
              }}
            >
              <Statistics
                title={"All User"}
                count={"3.5k"}
                icon={ImageConst?.user_icon}
                color={ColorConstant?.lightGreen}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Statistics
                title={"Total Revenue Space"}
                count={326}
                icon={ImageConst?.total_revenue_icon}
                color={ColorConstant?.lightPink}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Statistics
                title={"Total Revenue"}
                count={"53k"}
                icon={ImageConst?.revenue_icon}
                color={ColorConstant?.lightBrown}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default UserDashBoard;
