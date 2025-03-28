import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { grayColor, orange } from '../components/constants/color';
import { AttachFile, Send } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: "kjhdsjfsa",
  name:"Abi",
}

function Chat() {

  const containerRef = useRef(null);

  return (
    <>
      <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"} bgcolor={grayColor}height={"90%"} sx={{overflowX:"hidden",overflowY:"auto"}}>
        {
          sampleMessage.map((i)=>(<MessageComponent key={i._id} message={i} user={user}/>))
        } 
      </Stack>
      <form style={{height:"10%"}}>
        <Stack direction={"row"} height={"100%"} padding={"0.75rem"} alignItems={"center"} position={"relative"}>
          <IconButton sx={{
            position: "absolute",
            left: "1.5rem",
            rotate:"30deg"
          }}>
            <AttachFile/>
          </IconButton>

          <InputBox placeholder='Type message here...'/>

          <IconButton type='submit' sx={{rotate:"-30deg", backgroundColor:orange,color:"White",marginLeft:"1rem",padding:"0.5rem","&:hover":{bgcolor:"error.dark",}}}>
            <Send/>
          </IconButton>
        </Stack>
      </form>
      <FileMenu/>   
    </>
  )
}

export default AppLayout()(Chat) 