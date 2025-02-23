import React, { memo } from 'react'
import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from "@mui/material";
import { sampleNotifications } from '../constants/sampleData';

const Notifications = () => {

  const friendRequestHandler = ({_id,accept}) => {
    console.log('Friend request accepted');
  }

  return <Dialog open>
     <Stack p={{xs:"1rem" , sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle>Notifications</DialogTitle>
      {
        sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => <NotificationItem sender={i.sender} _id={i._id} key={i._id} handler={friendRequestHandler}/>)) : (<Typography textAlign={"center"} >0 notifications</Typography>)}
     </Stack>
  </Dialog>
};

const NotificationItem =  memo(({sender,_id,handler}) => {
  const {name,avatar}=sender;
  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} >
        <Avatar/>
        <Typography variant='body1' sx={{
          flexGrow:1,
          display:"-webkit-box",
          WebkitLineClamp:1,
          WebkitBoxDrient:"vertical",
          overflow:"hidden",
          textOverflow:"ellipsis",
          width:"100%"
        }}>{`${name} sent you a friend request.`}</Typography>
      <Stack direction={{
        xs:"column",
      }}>
        <Button onClick={()=>handler({_id,accept:true })}>Accept</Button>
        <Button color="error" onClick={()=>handler({_id,accept:false })}>Reject</Button>
      </Stack>
      </Stack>
    </ListItem>
  )
});

export default Notifications;