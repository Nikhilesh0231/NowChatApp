import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {sampleUsers} from '../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'

const NewGroup = () => {

  const groupName = useInputValidation("")
 
  const[members,setMembers] =useState(sampleUsers);
  const[selectedMembers,setSelectedMembers] =useState([]);

  const selectMemberHandler = (id) => {
    setMembers((prev)=>prev.map((user)=>user._id === id ? {...user,isAdded:!user.isAdded}:user));
    setSelectedMembers((prev)=> prev.includes(id)?prev.filter((currElement) => currElement !== id):[...prev,id])
  }  
  // console.log(selectedMembers);
 
  const submitHandler = () => {
    console.log('Group created')
  }  

  const closeHandler = () => {}

  return  <Dialog open onClose={closeHandler}>
  <Stack p={{xs:"1rem" , sm:"3rem"}} width={"25rem"} spacing={"2rem"}>
   <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
   <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/> 
   <Typography variant='body1'>Members</Typography>
    <Stack>
    {members.map((user) => (
          <UserItem user={user} key={user._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
        ))}   
    </Stack>
    <Stack justifyContent={"space-evenly"} direction={"row"}>
        <Button size='large' variant='contained'color='error'>Cancel</Button>
        <Button onClick={submitHandler} size='large' variant='contained'>Create</Button>
    </Stack>
  </Stack>
</Dialog> 
}

export default NewGroup