import { compare } from 'bcrypt';
import { User } from '../models/user.js';
import { sendToken } from '../utils/features.js';
import { TryCatch } from '../middlewares/error.js';
import { ErrorHandler } from '../utils/utility.js';
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

const getMyProfile = (req, res) => {};

export { login, newUser,getMyProfile };