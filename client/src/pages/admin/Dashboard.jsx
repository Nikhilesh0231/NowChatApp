import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { AdminPanelSettings, Group, Message, Notifications, Person, Search } from '@mui/icons-material';
import moment  from 'moment'
import { SearchField,CurveButton} from '../../components/styles/StyledComponent';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';

const Dashboard = () => {

  const Appbar = ( <Paper elevation={3} sx={{padding:"2rem",margin:"2rem 0rem",borderRadius:"1rem"}}>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AdminPanelSettings sx={{fontSize:"3rem"}}/>

      <SearchField/>
  
      <CurveButton>
        <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
         <Search/>
         <Typography>Search</Typography>
        </Stack>
      </CurveButton>
      <Box flexGrow={1}/>
      <Typography display={{xs:"none",lg:"block",}} color={"rgba(0,0,0,0.7"} textAlign={"center"}>
        {moment().format("MMMM Do YYYY,h:mm:ss a")}
      </Typography>
      <Notifications/>
    </Stack>
  </Paper>
  );

  const Widgets = (
    <Stack direction={{xs:"column",sm:"row"}} spacing={"2rem"} justifyContent={"space-between"} alignItems={"center"} margin={"2rem 0"}>
      <Widget title={"Users"} value={34} Icon={<Person/>}/>
      <Widget title={"Chats"} value={3} Icon={<Group/>}/>
      <Widget title={"Messages"} value={453} Icon={<Message/>}/>
    </Stack>
  )
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper elevation={3} sx={{padding:"2rem 3.5rem",borderRadius:"1rem",width:"100%",maxWidth:"45rem",height:"25rem"}}>
            <Typography margin={"2rem 0rem"} variant='h4'>Last Messages</Typography>
            <LineChart/>
          </Paper>

          <Paper elevation={3} sx={{padding:"1rem",borderRadius:"1rem",display:"flex",justifyContent:"center",alignItems:"center",width:{xs:"100%",sm:"50%",},position:"relative",width:"100%",maxWidth:"25rem",height:"25rem"}}>
            <DoughnutChart/>
            <Stack position={"absolute"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"1rem"} width={"100%"} height={"100%"}>
              <Group/> <Typography>Vs</Typography> <Person/>
            </Stack> 
          </Paper>          
        </Stack>
         {Widgets}
      </Container>
    </AdminLayout> 
  )
}

const Widget = ({title,value,Icon}) => <Paper elevation={3} sx={{padding:"2rem",margin:"2rem 0",borderRadius:"1rem",width:"20rem",}}>
  <Stack spacing={"1rem"} alignItems={"center"}>
    <Typography sx={{color:"rgba(255,100,0,0.9)",borderRadius:"50%",border:"6px solid rgba(255,100,0,0.9)",width:"5rem",height:"5rem",display:"flex",justifyContent:"center",alignItems:"center"}}>{value}</Typography>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} color={"rgba(255,100,0,0.9)"}>{Icon}<Typography sx={{color:"rgba(255,100,0,0.9)"}}>{title}</Typography></Stack>
  </Stack>
</Paper>

export default Dashboard; 