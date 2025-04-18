import express from "express"
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv';
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.js'
import chatRoute from './routes/chat.js'
import adminRoute from './routes/admin.js'
import { createGroupChats, createMessagesInAChat, createSingleChats, } from "./seeders/chat.js";
import { createUser } from './seeders/user.js';
 

dotenv.config({
  path: './.env',
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);
 
// createUser(10); 
// createSingleChats(10);
// createGroupChats(10); 
// createMessagesInAChat("67c4294c8a9a8698719b0499",50)
const port = process.env.PORT || 3000;

const app = express();

//Using Middlewares here
app.use(express.json());
app.use(cookieParser());



app.use('/user',userRoute);
app.use('/chat',chatRoute);
app.use('/admin',adminRoute);

app.get('/',(req,res)=>{
  res.send('Hello World!')
})

app.use(errorMiddleware);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`); 
});