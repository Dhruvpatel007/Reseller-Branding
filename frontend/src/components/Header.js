import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import { CChartBar } from "@coreui/react-chartjs";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Header = () => {

    const dashbordHandler = () => {
        window.location.href = "/dashboard";
      };
    
      const logoutHandler = () =>{
        localStorage.removeItem('token')
        window.location.href = "/";
      }

      return(
<Box sx={{ flexGrow: 1, color: "text.primary" }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
          SharkStriker
        </Typography>
        <Button color="inherit" onClick={dashbordHandler}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={logoutHandler}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
};

export default Header;
