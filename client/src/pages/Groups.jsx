import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import {Backdrop, Box, Button, Drawer, Grid, IconButton,Stack,TextField,Tooltip, Typography } from "@mui/material"
import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from "@mui/icons-material"
import { bgGradient, matBlack } from '../components/constants/color'
import {useNavigate,useSearchParams} from "react-router-dom"; 
import {Link} from '../components/styles/StyledComponent'
import AvatarCard from '../components/shared/AvatarCard'
import {sampleChats, sampleUsers} from '../components/constants/sampleData'
import UserItem from '../components/shared/UserItem';

const ConfirmDeleteDialog = lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(()=>import("../components/dialogs/AddMemberDialog"))

const isAddMember = false;

function Groups() {

  const chatId = useSearchParams()[0].get("group");
  // console.log(chatId)
  const navigate = useNavigate();

    


  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);

  const [isEdit,setIsEdit]=useState(false);

  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

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
 
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    console.log("Add Member");
  }

  const deleteHandler = () => {
    console.log("Delete Handler")
  }

  const removeMemberHandler = (id) => {

  }

  useEffect(()=>{
    if(chatId){
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    } 
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

    const ButtonGroup = <Stack direction={{sm:"row",xs:"column-reverse"}} spacing={"1rem"} p={{sm:"1rem",xs:"0",md:"1rem 4rem",}}>
      <Button onClick={openConfirmDeleteHandler} startIcon={<Delete/>} size='large' color='error' variant='contained'>Delete Group</Button>
      <Button onClick={openAddMemberHandler} startIcon={<Add/>} size='large' variant='contained'>Add Member</Button>
    </Stack>

  return (
    <Grid container height={"100vh"}>
      <Grid item sm={4} sx={{display:{xs:"none",sm:"block",}, }}>
       <GroupList myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid item xs={12} sm={8} sx={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",padding:"1rem 3rem",}}>
          {IconBtns}

          {groupName && ( <>
            {GroupName}
            <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1'>Members</Typography>
            <Stack maxWidth={"45rem"} width={"100%"} boxSizing={"border-box"} padding={{sm:"1rem",xs:"0",md:"1rem 4rem"}} spacing={"2rem"} bgcolor={""} height={"50vh"} overflow={"auto"}>
              {/* Members */}

              {
                sampleUsers.map((i)=>(<UserItem key={i._id} user={i}  isAdded styling={{boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",padding:"1rem 2rem",borderRadius:"1rem",}} handler={removeMemberHandler} />

                ))}

            </Stack>

            {ButtonGroup}

          </>)}
      </Grid>

      {
        isAddMember && <Suspense fallback = {<Backdrop open></Backdrop>}>
          <AddMemberDialog />
        </Suspense>
      }


      {
        confirmDeleteDialog &&  <Suspense fallback = {<Backdrop open/>}>
          <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/>
        </Suspense>
      }


      <Drawer sx={{
        display:{ 
          xs:"block",
          sm:"none",
        },
      }} open={isMobileMenuOpen} onClose={handleMobileClose}><GroupList w={"50vw"} myGroups={sampleChats} chatId={chatId} /></Drawer>
    </Grid> 
  )
}


const GroupList = ({w="100%",myGroups=[],chatId}) => {
 return <Stack width={w} sx={{backgroundImage:bgGradient,height:"100vh",overflow:"auto"}}>
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