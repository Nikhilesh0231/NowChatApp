import mongoose from "mongoose";
import jwt from "jsonwebtoken";



const connectDB = (uri) => {
  mongoose.connect(uri, { dbName: "NowChatApp" })
    .then((data) => console.log(`Connected to DB : ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
}

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,//15days
  httpOnly: true,
  secure: true,
  sameSite: "none",
}

const sendToken = (res, user, code, message) => {

  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

  return res.status(code).cookie("now-chat-app-token", token, cookieOptions).json({
    success: true,
    message
  })
};

const emitEvent = (req,event,users,data) => {
  console.log("Emmiting event",event);  
  }

// export the functions
export { connectDB, sendToken ,cookieOptions,emitEvent };