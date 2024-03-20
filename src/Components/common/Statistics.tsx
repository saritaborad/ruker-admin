import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
const Statistics = (props: any) => {
  // return (
  //   <Paper
  //     sx={{
  //       p: 3,
  //       // margin: "auto",
  //       // maxWidth: 600,
  //       // flexGrow: 1,
  //       backgroundColor: props?.color,
  //       borderRadius: "8px",
  //       boxShadow: "none !important",
  //       // backgroundColor: (theme) =>
  //       //   theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //     }}
  //   >
  //     <Grid container spacing={2}>
  //       <Grid item xs={12} sm container>
  //         <Grid item xs container direction="column">
  //           <Grid item xs={10} md={12} sm={12}>
  //             <Typography
  //               sx={{
  //                 // fontSize: FontConst?.FONTSIZE_16,
  //                 //   fontWeight: FontConst?.FONTWEIGHT_500,
  //                 fontFamily: "Roboto-bold",
  //                 fontSize:{sm:"14px", md:"16px", lg:"16px", xs:"12px"}

  //               }}
  //             >
  //               {props?.title}
  //             </Typography>
  //             <Typography
  //               sx={{
  //                 // fontSize: FontConst?.FONTSIZE_30,
  //                 fontSize:{sm:"20px", md:"24px", lg:"30px", xs:"18px"},

  //                 fontFamily: "Roboto-bold",
  //               }}
  //             >
  //               {props?.count}
  //             </Typography>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //       <Grid item>
  //         <ButtonBase>
  //           <img
  //             alt="complex"
  //             src={props?.icon}
  //             style={{
  //               width: `${{
  //                 sm: "32px !important",
  //                 md: "42px !important",
  //                 lg: "52px !important",
  //                 xs: "24px !important",
  //               }}`,
  //               height: `${{
  //                 sm: "32px !important",
  //                 md: "42px !important",
  //                 lg: "52px !important",
  //                 xs: "24px !important",
  //               }}`,
  //             }}
  //           />
  //         </ButtonBase>
  //       </Grid>
  //     </Grid>
  //   </Paper>
  // );
  return (
    <Paper
      sx={{
        position: "relative",
        height: "80px",
        p: { xs: 2, sm: 2, md: 3, lg: 4 },
        backgroundColor: props?.color,
        borderRadius: "8px",
        boxShadow: "none !important",
      }}
    >
      <Grid
        container
        spacing={{ md: 2, xs: 1, lg: 3, sm: 1, xl: 2 }}
        alignItems="center"
      >
        <Grid item xs={12} md={7} sm={8} lg={8}>
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "14px", sm: "12px", lg: "16px" },
              fontFamily: "Roboto-bold",
            }}
          >
            {props?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px", sm: "20px", lg: "24px" },
              fontFamily: "Roboto-bold",
            }}
          >
            {props?.count}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={4}>
          <Box
            sx={{
              width: { lg: 72, md: 56, sm: 48, xs: 0 },
              visibility: {
                lg: "visible",
                md: "visible",
                sm: "hidden",
                xs: "hidden",
              },
            }}
          >
            <img
              alt="complex"
              src={props?.icon}
              style={{
                width: "inherit",
                position: "absolute",
                top: 35,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Statistics;
