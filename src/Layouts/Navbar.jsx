import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Login", path: "/login" },
    { name: "Product", path: "/admin/product" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO / BRAND NAME */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer",
              color: "#000000",
            }}
          >
            MUI
          </Typography>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "1rem",
                  position: "relative",
                  transition: "color 0.3s ease",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    paddingBottom: "2px",
                  }}
                  className="nav-link"
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </Box>

          {/* MOBILE MENU ICON */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#000000" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#ffffff",
            height: "100%",
            color: "#000000",
            p: 2,
          }}
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "#000000",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Inline styles for hover underline effect */}
      <style>{`
        .nav-link {
          display: inline-block;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -3px;
          left: 0;
          background-color: #000;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:hover {
          color: #333;
        }
      `}</style>
    </>
  );
};

export default Navbar;
