import {body,validationResult,check} from 'express-validator';
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


export {registerValidator,validateHandler,loginValidator,newGroupChatValidator};