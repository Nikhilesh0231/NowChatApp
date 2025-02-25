import React from 'react'
import { Menu } from '@mui/material'

const FileMenu = ({anchorE1}) => {
  return (
   <Menu anchorEl={anchorE1} open={false}>
     <div style={{width:"10rem",}}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus harum quia et neque fugiat, ullam ipsa repudiandae mollitia, nihil natus tempore, aliquam rerum.
     </div> 
   </Menu>
  )
}

export default FileMenu;