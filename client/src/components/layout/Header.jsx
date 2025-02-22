import {AppBar,Backdrop,Box,IconButton,Toolbar,Tooltip,Typography,} from "@mui/material";
import { Add, Group, Logout, Menu, Notifications, Search } from "@mui/icons-material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../constants/color.js";
import { useNavigate } from "react-router-dom";
 
const SearchDialog = lazy(() => import("../specific/Search.jsx")); 
const NotificationDialog = lazy(() => import("../specific/Notifications.jsx")) 
const NewGroupDialog = lazy(()=>import("../specific/NewGroup.jsx"))

const Header = () => {
  const navigate = useNavigate();

  const[ismobile,setIsMobile] =useState(false);
  const[isSearch,setIsSearch] =useState(false);
  const[isNewGroup,setIsNewGroup] =useState(false);
  const[isNotification,setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile(!ismobile);
  };
  const openSearch = () => {
    setIsSearch(!isSearch);
  };
  const openNewGroup = () => {
    setIsNewGroup(!isNewGroup);
  };
  const openNotification = () => {
    setIsNotification(!isNotification);
  };

  const logoutHandler = () => {
    console.log("Logout")
  }

  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ backgroundColor: orange }}>
          <Toolbar>
            <Typography variant="h6" sx={{display: { xs: "none", sm: "block" },}}>NowChatApp</Typography>
            <Box sx={{display: { xs: "block", sm: "none" },}}>
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box sx={{flexGrow: 1,}}/>
            <Box>
              <IconBtn title={"serach"} icon={<Search/>} onclick={openSearch}/>
              <IconBtn title={"New Group"} icon={<Add/>} onclick={openNewGroup}/>
              <IconBtn title={"Manage Groups"} icon={<Group />} onclick={navigateToGroup}/>
              <IconBtn title={"Notifications"} icon={<Notifications/>} onclick={openNotification}/>
              <IconBtn title={"Logout"} icon={<Logout />} onclick={logoutHandler}/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch &&
        (
          <Suspense fallback ={<Backdrop open/>}>
            <SearchDialog/>
          </Suspense>
        )}
      {isNotification &&
        (
          <Suspense fallback ={<Backdrop open/>}>
            <NotificationDialog/>
          </Suspense>
        )}
      {isNewGroup &&
        (
          <Suspense fallback ={<Backdrop open/>}>
            <NewGroupDialog />
          </Suspense>
        )}
    </>
  );
};

const IconBtn = ({ title, icon, onclick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onclick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
