import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.js';
import { attachmentsMulter } from '../middlewares/multer.js';
import { newGroupChatValidator, validateHandler } from '../lib/validators.js';

const app = express.Router();


//After here user must be logged in to access the routes
app.use(isAuthenticated);

app.post("/new", newGroupChatValidator(),validateHandler,newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMembers);
app.put("/removemember",removeMember);
app.delete("/leave/:id",leaveGroup);
app.post("/message",attachmentsMulter,sendAttachments);
//GetMessageApi
app.get("/message/:id",getMessages);
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);


export default app; 