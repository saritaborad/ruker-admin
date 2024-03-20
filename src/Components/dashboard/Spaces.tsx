import React from "react";
import { Box, Grid } from "@mui/material";
import ImageConst from "./../../Constants/ImageConst";
import ColorConstant from "./../../Constants//ColorConstant";
import Statistics from "./../common/Statistics";
import { useAppSelector } from "./../../store/hooks";
import AllSpacesTable from "./tables/AllSpacesTable";

import {
  selectNavigatedFrom,
} from "./../../store/slices/adminSlice";
const Spaces = () => {
  const isNavigatredfromDashboard:any = useAppSelector(selectNavigatedFrom);

  return (
    <div style={{ margin: "auto 40px" }}>
      {isNavigatredfromDashboard===true? (<AllSpacesTable/>) : ( <Box>
        <Grid container spacing={3} columns={32}>
          <Grid item xs={8}>
            <Box>
              <Statistics
                title={"All Space"}
                count={900}
                icon={ImageConst?.space_blue}
                color={ColorConstant?.lightBlue}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Statistics
                title={"Work Space"}
                count={900}
                icon={ImageConst?.space_brown}
                color={ColorConstant?.lightBrown}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Statistics
                title={"Community Space"}
                count={900}
                icon={ImageConst?.space_green}
                color={ColorConstant?.lightGreen}
              />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Statistics
                title={"Archived Space"}
                count={900}
                icon={ImageConst?.space_gray}
                color={ColorConstant?.lightGray}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>) }
    
    </div>
  );
};

export default Spaces;
