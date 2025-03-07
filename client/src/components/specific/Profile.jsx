import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face ,AlternateEmail,CalendarMonth } from '@mui/icons-material'
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar sx={{
        width: 200,
        height: 200,
        objectFit:"contain",
        marginBottom:"1rem",
        border:"5px solid white ",
      }}/>
      <ProfileCard heading={"bio"} text={"Hello this is klsamfd"}/>
      <ProfileCard heading={"username"} text={"tnikhilesh"} Icon={<AlternateEmail/>}/>
      <ProfileCard heading={"Name"} text={"Nikhilesh Tiwari"} Icon={<Face/>}/>
      <ProfileCard heading={"Joined"} text={moment('2024-10-04T00:00:00.000Z').fromNow()} Icon={<CalendarMonth/>}/>
    </Stack>
  )
}
const ProfileCard = ({text,Icon,heading}) => <Stack direction={"row"}
alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
  {Icon && Icon}
  <Stack>
    <Typography variant="body1">{text}</Typography> 
    <Typography color={"white"} variant="caption">{heading}</Typography> 
  </Stack>
</Stack>

export default Profile