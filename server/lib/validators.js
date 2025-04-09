import {body,validationResult} from 'express-validator';
import { ErrorHandler } from '../utils/utility.js';

const registerValidator = () => [
  body("name","Please enter name").notEmpty(),
  body("username","Please enter username ").notEmpty(),
  body("password","Please enter password").notEmpty(),
  body("bio","Please enter bio").notEmpty()
];

const validateHandler = (req,res,next) => {
  const errors = validationResult(req);
  // console.log(errors);
  const errorMessage = errors.array().map((error)=>error.msg).join(", ");
  // console.log(errorMessage);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage ,400));
}
export {registerValidator,validateHandler};