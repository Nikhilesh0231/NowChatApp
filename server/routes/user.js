import express from 'express';     
import { getMyProfile, login ,newUser } from '../controllers/user.js';
import { singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

const app = express.Router();

app.post("/new",singleAvatar,newUser);
app.post("/login",login);

//After here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/me",getMyProfile); 

export default app; 