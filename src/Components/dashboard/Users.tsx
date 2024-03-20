import React from "react";
import { Box, Grid } from "@mui/material";
import ImageConst from "./../../Constants/ImageConst";
import ColorConstant from "./../../Constants//ColorConstant";
import Statistics from "./../common/Statistics";
import { useAppSelector } from "./../../store/hooks";
import AllUsersTable from "./tables/AllUsersTable";
import {
  selectNavigatedFrom,
} from "./../../store/slices/adminSlice";
const Users = () => {
  const isNavigatredfromDashboard:any = useAppSelector(selectNavigatedFrom);

  return (
    <div style={{ margin: "auto 40px" }}>
        {isNavigatredfromDashboard===true? (<AllUsersTable/>) :(
           <Box>
           <Grid container spacing={3} columns={32}>
             <Grid item xs={8}>
               <Box>
                 <Statistics
                   title={"All Users"}
                   count={"5.3k"}
                   icon={ImageConst?.user_blue}
                   color={ColorConstant?.lightBlue}
                 />
               </Box>
             </Grid>
             <Grid item xs={8}>
               <Box>
                 <Statistics
                   title={"Active Users"}
                   count={"3.5k"}
                   icon={ImageConst?.user_green}
                   color={ColorConstant?.lightGreen}
                 />
               </Box>
             </Grid>
             <Grid item xs={8}>
               <Box>
                 <Statistics
                   title={"Registered Users"}
                   count={50}
                   icon={ImageConst?.user_brown}
                   color={ColorConstant?.lightBrown}
                 />
               </Box>
             </Grid>
             <Grid item xs={8}>
               <Box>
                 <Statistics
                   title={"Deactivate Users"}
                   count={"400"}
                   icon={ImageConst?.user_gray}
                   color={ColorConstant?.lightGray}
                 />
               </Box>
             </Grid>
           </Grid>
         </Box>
        )}
     
    </div>
  );
};

export default Users;
