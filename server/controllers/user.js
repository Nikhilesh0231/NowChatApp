import { compare } from 'bcrypt';
import { User } from '../models/user.js';
import { Chat } from '../models/chat.js'
import { cookieOptions, emitEvent, sendToken } from '../utils/features.js';
import { TryCatch } from '../middlewares/error.js';
import { ErrorHandler } from '../utils/utility.js';
import { Request } from '../models/request.js'
import { NEW_REQUEST } from '../constants/events.js';



//create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  // console.log(req.body); 
  const avatar = {
    public_id: "lkdpsam",
    url: "slkansl",
  };
  const user = await User.create({ name, bio, username, password, avatar, });
  sendToken(res, user, 201, "User Created")
}



//login user and save tocken in cookie

const login = TryCatch(async (req, res ,next) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password",404));

  const isPasswordMatch = await compare(password, user.password);

  if (!isPasswordMatch) return next(new ErrorHandler("Invalid Password",404));

  sendToken(res, user, 200, `Logged in successfully,welcome back ${user.name}`);

});

const getMyProfile = TryCatch(async(req, res) => {

  const user = await User.findById(req.user); 

  res.status(200).json({
    success:true,
    user,
  });
});

const logout = TryCatch(async(req, res) => {
  return res.status(200).cookie("now-chat-app-token","",{...cookieOptions,maxAge : 0}).json({
    success:true,
    message:"Logged out successfully" ,
  });
});

const searchUser = TryCatch(async(req,res)=>{
  const {name = ""} = req.query;

  const myChats = await Chat.find({groupChat : false , members : req.user});
  
  //All user from my Chats means Friends and Also Including me
  // const allUserFromMyChat = myChats.map((chat) => chat.members).flat();
  const allUserFromMyChat = myChats.flatMap((chat) => chat.members);

  const allUserExceptMeAndFriends = await User.find({
    _id:{$nin : allUserFromMyChat },
    name : {$regex : name , $options : "i" },
  })

  const users = allUserExceptMeAndFriends.map((_id,name,avatar)=>({_id,name,avatar:avatar.url}))
  
  return res.status(200).json({
    success:true,
    // message:name, 
    // myChats,
    // allUserFromMyChat,
    // allUserExceptMeAndFriends, 
    users,
  })
});

const sendrequest = TryCatch(async(req, res) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or:[
        {sender:req.user,reciver:userId},
        {receiver: req.user, sender: userId},
    ],
  });

  if(request) return next(new ErrorHandler("Request already sent",400));

  await Request.create({
    sender:req.user,
    receiver:userId,  
  });

  emitEvent(req,NEW_REQUEST,[userId]);

  return res.status(200).json({
    success:true,
    message:"Friend Request Send" ,
  });
});

export { login, newUser , getMyProfile , logout , searchUser ,sendrequest};  