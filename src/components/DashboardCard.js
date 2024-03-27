import React from "react";
import { Grid, Stack, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Heading20, Heading24 } from "./CustomComponent";

const DashboardCard = ({ title, total, img }) => {
  const theme = useTheme();
  return (
   <Paper sx={{width:"100%"}}>
     <Stack
      direction="row"
      borderRadius="10px"
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
      p="20px"
      sx={{
        background: "#fff",
      }}
    >
      <Grid container item xs={8} sm={8} md={8} lg={8} className="txtDiv">
        <Grid item className="flexDir">
          <Heading20
            sx={{
              color: "#B7B7B7",
            }}
          >
            {title}
          </Heading20>
          <Heading24
            className="CardText b1c_color fs24px fontWeight700"
            sx={{
              color:
                title?.toLowerCase() === "alerts" && Number(total) !== 0
                  ? "red !important"
                  : "",
            }}
          >
            {total}
          </Heading24>
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.primary.main,
          borderRadius: "12px",
          p: 1.5,
        }}
      >
        <img src={img} style={{ width: "30px", height: "30px" }} alt="error" />
      </Grid>
    </Stack>
   </Paper>
  );
};

export default DashboardCard;
