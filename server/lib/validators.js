import {body,validationResult,check,param,query} from 'express-validator';
import { ErrorHandler } from '../utils/utility.js';

const validateHandler = (req,res,next) => {
  const errors = validationResult(req);
  // console.log(errors);
  const errorMessage = errors.array().map((error)=>error.msg).join(", ");
  // console.log(errorMessage);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage ,400));
}

const registerValidator = () => [
  body("name","Please enter name").notEmpty(),
  body("username","Please enter username ").notEmpty(),
  body("password","Please enter password").notEmpty(),
  body("bio","Please enter bio").notEmpty(),
  check("avatar","Please Upload Avatar").notEmpty()
];

const loginValidator = () => [
  body("username","Please enter username ").notEmpty(),
  body("password","Please enter password").notEmpty(),
];


const newGroupChatValidator = () => [
  body("name","Please enter name ").notEmpty(),
  body("members").notEmpty().withMessage("Please enter members").isArray({min:2,max:100}).withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId","Please enter chatId ").notEmpty(),
  body("members").notEmpty().withMessage("Please enter members").isArray({min:1,max:97}).withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId","Please enter chatId ").notEmpty(),
  body("userId","please Enter UserId").notEmpty(),
];

const leaveGroupValidator = () => [
  param("Id","Please enter Id ").notEmpty(),
];

const sendAttachmentValidator = () => [
  body("chatId","Please enter chatId ").notEmpty(),
  check("files").notEmpty().withMessage("Please upload attachments").isArray({min:1,max:5}).withMessage("Attachments must be 1 to 5"),
];

const getMessageValidator = () => [
  param("Id","Please enter chat Id ").notEmpty(),
];

const getChatDetialsValidator = () => [
  param("Id","Please enter chat Id ").notEmpty(),
];

const renameGroupValidator = () => [
  body("name","Please enter new name ").notEmpty(),
  param("Id","Please enter chat Id ").notEmpty(),
];

const deleteChatValidator = () => [
  param("Id","Please enter chat Id ").notEmpty(),
];


export {registerValidator,validateHandler,loginValidator,newGroupChatValidator,addMemberValidator,removeMemberValidator,leaveGroupValidator,sendAttachmentValidator,getMessageValidator,getChatDetialsValidator,renameGroupValidator,deleteChatValidator};