import { Add, Remove } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'

const UserItem = ({user,handler,handlerIsLoading}) => {
  const {name,_id,avatar,isAdded} = user;
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
        }}>{name}</Typography>
        <IconButton size='small' sx={{
          color: "white",
          bgcolor:`${isAdded?"error.main":"primary.main"}`,
          "&:hover": {
            bgcolor: `${isAdded?"error.dark":"primary.dark"}`,
          }
        }} onClick={()=>handler(_id)} disabled ={handlerIsLoading} >
          {
            isAdded ?<Remove/>:<Add/>
          }    
        </IconButton>
      </Stack>
    </ListItem>
  )
} 
       
export default memo(UserItem)