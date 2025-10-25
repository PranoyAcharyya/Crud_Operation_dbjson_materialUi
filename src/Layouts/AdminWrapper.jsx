import React from "react";

import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";


import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const AdminWrapper = () => {
  return (
    <Container maxWidth="xxl">
     
       <Navbar/>
  
      <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
        <Box sx={{width:"18%", height:"100vh"}}>
          <Sidebar />
        </Box>
        <Box sx={{width:"82%", height:"100vh"}}>
          <Outlet />
        </Box>
      </Box>
    </Container>
    
  );
};

export default AdminWrapper;
