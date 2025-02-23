import React, { useState } from "react";
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem"; 
import { sampleUsers } from "../constants/sampleData";

const Search = () => {
  const search = useInputValidation("")
  const [users, setUsers] = useState(sampleUsers)

  let isLoadingSendFriendRequest = false;  

  const addFriendHandler = (id) => {
    console.log(id);
  }
 
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField value={search.value} onChange={search.changeHandler} variant="outlined" InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          )
        }} label=""/>
      <List>
        {users.map((user) => (
          <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
        ))}
      </List>  
       
      </Stack>
    </Dialog> 
  );
};

export default Search;
