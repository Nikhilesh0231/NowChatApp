import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.js';
import { attachmentsMulter } from '../middlewares/multer.js';
import { addMemberValidator, deleteChatValidator, getChatDetialsValidator, getMessageValidator, leaveGroupValidator, newGroupChatValidator, removeMemberValidator, renameGroupValidator, sendAttachmentValidator, validateHandler } from '../lib/validators.js';

const app = express.Router();


//After here user must be logged in to access the routes
app.use(isAuthenticated);

app.post("/new", newGroupChatValidator(),validateHandler,newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMemberValidator(),validateHandler,addMembers);
app.put("/removemember",removeMemberValidator(),validateHandler,removeMember);
app.delete("/leave/:id",leaveGroupValidator(),validateHandler,leaveGroup);
app.post("/message",attachmentsMulter,sendAttachmentValidator(),validateHandler,sendAttachments);
//GetMessageApi
app.get("/message/:id",getMessageValidator(),validateHandler,getMessages);
//Get Chat details,rename,delete
app.route("/:id")
.get(getChatDetialsValidator(),validateHandler,getChatDetails)
.put(renameGroupValidator(),validateHandler,renameGroup)
.delete(deleteChatValidator(),validateHandler,deleteChat);


export default app; 