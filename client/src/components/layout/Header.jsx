import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { orange } from "../constants/color.js";

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ backgroundColor: orange,}}>

        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            NowChatApp
          </Typography>
        </Toolbar>
        </AppBar> 
      </Box>
    </>
  );
};

export default Header;
