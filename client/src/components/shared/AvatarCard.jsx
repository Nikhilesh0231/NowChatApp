import React from 'react'
import {Avatar, AvatarGroup, Box, Stack} from '@mui/material'
//Todo Transform
const AvatarCard = ({avatar = [],max=4}) => {
  return <Stack direction={'row'} spacing={0.5}>
    <AvatarGroup max={max}>
      <Box width={"5rem"} height={"3rem"}>
      {
        avatar.map((i,index)=>(
          <Avatar src={i} alt={`Avatar ${index}`} key={Math.random()*100}  sx= {{width:"3 rem",height:"3rem",position:"absolute",left:{
            xs:`${0.5 +index}rem`,
            sm:`${index}rem`,
          }}}/>
        ))
      }  
      </Box> 
    </AvatarGroup>
  </Stack>  
}

export default AvatarCard    