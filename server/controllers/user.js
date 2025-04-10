import { compare } from 'bcrypt';
import { User } from '../models/user.js';
import { Chat } from '../models/chat.js'
import { cookieOptions, emitEvent, sendToken } from '../utils/features.js';
import { TryCatch } from '../middlewares/error.js';
import { ErrorHandler } from '../utils/utility.js';
import { Request } from '../models/request.js'
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMember } from  '../lib/helper.js'



//create a new user and save it to the database and save in cookie
const newUser = async (req, res,next) => {
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

const getMyProfile = TryCatch(async(req, res,next) => {

  const user = await User.findById(req.user); 
  if(!user) return next(new ErrorHandler("User not found",404));

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

const searchUser = TryCatch(async(req,res,next)=>{
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

const sendrequest = TryCatch(async(req, res,next) => {
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
const acceptrequest = TryCatch(async(req, res ,next) => {
  
  const {requestId , accept} = req.body;

  const request = await Request.findById(requestId).populate("sender","name").populate("recevier","name");

  if(!request) return next(new ErrorHandler("Request not found",404));

  if(request.receiver._id.toString() !== req.user.toString()) return next(new ErrorHandler("You are not authorized to acept the request",401));


  if(!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success:true,
      message:"Request Declined" ,
      });
  }

  const members = [request.sender._id,request.receiver._id];

  await Promise.all([Chat.create({members,name:`${request.sender.name}-${request.receiver.name}`}),
    request.deleteOne(),
  ])

  emitEvent(req,REFETCH_CHATS,members)

  return res.status(200).json({
    success:true,
    message:"Friend Request Accepted" ,
    senderId : request.sender._id,   
  });
});

const getAllNotification = TryCatch(async(req,res)=>{
  const requests = await Request.find({receiver:req.user}).populate("sender","name","avatar");

  const allRequests = requests.map(({_id,sender})=>({
    _id,
    sender:{
      _id:sender._id,
      name:sender.name,
      avatar:sender.avatar.url,
    },
  })) 
  return res.status(200).json({
    success:true,
    allRequests
    });

})
const getMyFriends = TryCatch(async(req,res)=>{

  const chatId = req.query.chatId;
  const chats =await Chat.find({members:req.user,groupChat:false,}).populate("members","name avatar");

  const friends = chats.map(({members})=>{
    const otherUser = getOtherMember(members,req.user);
    return{
      _id:otherUser._id,
      name:otherUser.name,
      avatar:otherUser.avatar.url,
    };
  });
  if(chatId){
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter((friend)=> !chat.members.includes(friend._id));
    return res.status(200).json({
      success:true,
      friends :  availableFriends, 
      });
  }
  else{
  return res.status(200).json({
    success:true,
    friends
    });
  }
})

export { login, newUser , getMyProfile , logout , searchUser ,sendrequest,acceptrequest,getAllNotification,getMyFriends};  