import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import { Close, ExitToApp, Groups, ManageAccounts, Menu, Message } from '@mui/icons-material';
import React, { useState } from 'react'
import { bgGradient1 } from '../constants/color';
import { useLocation , Link as LinkComponent, Navigate} from 'react-router-dom';
import { Dashboard } from "@mui/icons-material";

const Link = styled(LinkComponent)`
text-decoration:none;
border-radius:2rem;
padding:0.8rem 2rem;
color:white;
&:hover{
color:rgbe(0,0,0,0.54);
}`;


const adminTabs = [
  {
  name:"DashBoard",
  path:"/admin/dashboard",
  icon:<Dashboard/>
},
  {
  name:"Users",
  path:"/admin/users",
  icon:<ManageAccounts/>
},
  {
  name:"Chats",
  path:"/admin/chats",
  icon:<Groups/>
},
  {
  name:"Messages",
  path:"/admin/messages",
  icon:<Message/>
},

]
 
const isAdmin = true;

const AdminLayout = ({children}) => {

  const [isMobile,setIsMobile]=useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

  const handleClose = () => setIsMobile(false);

  if(!isAdmin) return <Navigate to={"/admin"}/> 

  return (
    <Grid container minHeight={"100vh"}>
      <Box sx={{display:{xs:"block",md:"none"},position:"fixed",right:"1rem",top:"1rem"}}>
        <IconButton onClick={handleMobile}>
          {isMobile ?<Close/>:<Menu/>}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{display:{xs:"none",md:"block"},backgroundImage:bgGradient1 , color:"white"}}>
          <SideBar/>
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{backgroundColor:"#f5f5f5",}}>
        {children}
      </Grid>

      <Drawer  open={isMobile} onClose={handleClose}>
        <Stack height={"100vh"} sx={{backgroundImage:bgGradient1,color:"white"}}>
          <SideBar w="50vw"/>
        </Stack>
      </Drawer>
    </Grid>
  )
};

const SideBar = ({w="100%"}) => {
  const location = useLocation();

  const logoutHandler = () => {
    console.log("logout");
  };

  return <Stack width={w} direction={"column"} spacing={"3rem"}>
    <Typography fontSize={"1.5rem"} fontWeight={"600"} paddingTop={"1rem"} boxShadow={"2px 2px 6px red"} textAlign={"center"} variant='h5' textTransform={"uppercase"}>
      NowChatApp
    </Typography>
    <Stack padding={"1rem"} spacing={"1rem"}>
      {   
        adminTabs.map((tab)=>(
          <Link key={tab.path} to={tab.path} sx={location.pathname === tab.path && {backgroundColor:"white",color:"red",":hover":{color:"red"},}}>
            <Stack  color={""} direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={"1.3rem"} variant={"body1"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))
      }
      <Link onClick={logoutHandler}>
            <Stack  color={""} direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {<ExitToApp/>}
              <Typography fontSize={"1.3rem"} variant={"body1"}>Logout</Typography>
            </Stack>
      </Link>
    </Stack>
  </Stack>
}

export default AdminLayout;