import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Menu, Search } from "@mui/icons-material";
import React from "react";
import { orange } from "../constants/color.js";

const Header = () => {
  const handleMobile = () => {
    console.log("mobile");
  };
  const openSearchDialog = () => {
    console.log("openSearchDialog");
  };
  const openNewGroup = () => {
    console.log("openNewGroup");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ backgroundColor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              NowChatApp
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
            <Tooltip title="Search">
              <IconButton
                color="inherit"
                size="large"
                onClick={openSearchDialog}
              >
                <Search />
              </IconButton>
              </Tooltip> 
              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>  
      </Box>
    </>
  );
};

export default Header;
