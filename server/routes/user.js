import express from 'express';     
import { acceptrequest, getAllNotification, getMyProfile, login ,logout,newUser, searchUser, sendrequest } from '../controllers/user.js';
import { singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from '../lib/validators.js';

const app = express.Router();

app.post("/new",singleAvatar,registerValidator(),validateHandler,newUser);
app.post("/login",loginValidator(),validateHandler,login);

//After here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/me",getMyProfile);  
app.get("/logout",logout);  
app.get("/search",searchUser); 
app.put("/sendrequest",sendRequestValidator(),validateHandler,sendrequest); 
app.put("/acceptrequest",acceptRequestValidator(),validateHandler,acceptrequest); 
app.get("/notifications",getAllNotification)


export default app; 