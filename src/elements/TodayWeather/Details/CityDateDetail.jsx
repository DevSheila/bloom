import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CityDateDetail = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="start"
        sx={{
          width: '100%',
          height: '40px',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "rgb(0,0,0)",
            padding: 0,
          }}
        >
          <LocationOnIcon sx={{ fontSize: "18px" }} />
        </Box>

        <Box
          sx={{
            color: "rgb(0,0,0)",
            fontSize: { xs: "12px", sm: "14px", md: "16px" },

            paddingLeft: { xs: "0px", sm: "4px", md: "6px" },
            paddingTop: { xs: "2px", sm: "0px" },
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.city}
        </Box>
      </Grid>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "10px", sm: "12px", md: "14px" },
          color: "rgb(0,0,0)",
          lineHeight: 1,
          letterSpacing: { xs: "1px", sm: "0" },
        }}
      >
        Today {props.date}
      </Typography>
    </Box>
  );
};

export default CityDateDetail;
