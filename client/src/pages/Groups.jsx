import React, { memo, useEffect, useState } from 'react'
import {Box, Drawer, Grid, IconButton,Stack,TextField,Tooltip, Typography } from "@mui/material"
import { Done, Edit, KeyboardBackspace, Menu } from "@mui/icons-material"
import { matBlack } from '../components/constants/color'
import {useNavigate,useSearchParams} from "react-router-dom"; 
import {Link} from '../components/styles/StyledComponent'
import AvatarCard from '../components/shared/AvatarCard'
import {sampleChats} from '../components/constants/sampleData'

function Groups() {

  const chatId = useSearchParams()[0].get("group");
  // console.log(chatId)
  const navigate = useNavigate();

    


  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
  const [isEdit,setIsEdit]=useState(false);
  const [groupName,setGroupName]=useState("");
  const [groupNameUpdatedValue,setGroupNameUpdatedValue]=useState("");




  const navigateBack = () =>{
    navigate("/");
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) =>!prev)
  };

  const handleMobileClose = () =>  setIsMobileMenuOpen(false); 

  const updateGroupName = () => {
    setIsEdit(false); 
    console.log(groupNameUpdatedValue)
  }

  useEffect(()=>{
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);

    return () => {
    setGroupName("");
    setGroupNameUpdatedValue(""); 
    setIsEdit(false);  
    } 
  },[chatId]) 


  const IconBtns = <>
  <Box sx={{display:{xs:"block",sm:"none",position:"fixed",right:"1rem",top:"1rem",}}}>
  <IconButton onClick={handleMobile}>
    <Menu/>
  </IconButton>
  </Box> 
  
  <Tooltip title="back">
    <IconButton sx={{position:"absolute", top:"2rem",left:"2rem",bgcolor:matBlack,color:"white",":hover":{
      bgcolor:"rgba(0,0,0,0.7)",
    }}}
    onClick={navigateBack}
    >
      <KeyboardBackspace/>
    </IconButton>
    </Tooltip></>  



    const GroupName = <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
      {
        isEdit 
        ?
        <>
        <TextField value={groupNameUpdatedValue} onChange={e=>setGroupNameUpdatedValue(e.target.value)}></TextField>
        <IconButton onClick={updateGroupName}>
          <Done/> 
        </IconButton>
        </>  
        :
        <>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={()=>setIsEdit(true)}><Edit/></IconButton>
        </>
      }
    </Stack>

  return (
    <Grid container height={"100vh"}>
      <Grid item sm={4} sx={{display:{xs:"none",sm:"block",},}} bgcolor={"bisque"}>
       <GroupList myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid item xs={12} sm={8} sx={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",padding:"1rem 3rem",}}>
          {IconBtns}

          {groupName &&  GroupName}
      </Grid>
      <Drawer sx={{
        display:{ 
          xs:"block",
          sm:"none",
        }
      }} open={isMobileMenuOpen} onClose={handleMobileClose}><GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} /></Drawer>
    </Grid> 
  )
}


const GroupList = ({w="100%",myGroups=[],chatId}) => {
 return <Stack width={w}>
    {
      myGroups.length> 0 ?( myGroups.map((group)=>(<GroupListItem group={group} chatId={chatId} key={group._id}/>)) ):(<Typography textAlign={"center"} padding={"1rem"}>No Groups</Typography>)
    }
  </Stack>
}; 

const GroupListItem = memo(({group,chatId}) => {
  const {name,avatar,_id} =group;
   return <Link to={`?group=${_id}`} onClick={e=>{
    if(chatId === _id) e.preventDefault();
   }}>
   <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <AvatarCard avatar={avatar}/> 
      <Typography>
        {name}
      </Typography>
   </Stack>
   </Link>
})

export default Groups; 