import express from "express"
import userRoute from './routes/user.js'
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv';
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config({
  path: './.env',
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const port = process.env.PORT || 3000;

const app = express();

//Using Middlewares here
app.use(express.json());



app.use('/user',userRoute);

app.get('/',(req,res)=>{
  res.send('Hello World!')
})

app.use(errorMiddleware);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`); 
});