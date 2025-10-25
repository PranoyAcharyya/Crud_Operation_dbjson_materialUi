import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  patch,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", path:"/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Products",  path:"/admin/product",icon: <InventoryIcon /> },
    { text: "User",path:"/admin/user" , icon: <PersonIcon /> },
    { text: "Settings", path:"/admin/settings" ,icon: <SettingsIcon /> },
  ];



  const removeToken = (e) =>{
    e.preventDefault();
     Cookies.remove("token");
      Navigate("/login");
  }

  const Navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#000",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          MyDashboard
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
            onClick={()=>Navigate(item.path)}
              sx={{
                borderRadius: "8px",
                mx: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Logout at the bottom */}
      <Box sx={{ p: 2 }} onClick={removeToken}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
        <ListItemButton
          sx={{
            mt: 1,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }} >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
