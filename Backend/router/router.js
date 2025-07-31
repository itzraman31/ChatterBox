import express from 'express'
const route = express.Router();
import { ContactusForm, searchalluser, home, login, signup, user, deleteuser, updateprofile, searchuser, searchuserwihtoutlogin } from '../controller/controller.js'
import passwordupdateftn from '../controller/passupdatecont.js'
import MustLogin from '../middleware/MustLogin.js'
import upload from '../middleware/MulterMiddleware.js';
import { updateprofilepic, removeProfilePic } from '../controller/ProfileChangeCont.js';

route.get("/", home)

route.post("/login", login)

route.post("/signup", upload.single("avatar"), signup)

route.post("/contactus", MustLogin, ContactusForm)

route.post("/updateprofilepic/:id", upload.single("avatar"), updateprofilepic)

route.get("/user", MustLogin, user);

route.delete("/delete", MustLogin, deleteuser)

route.post("/updateprofile", updateprofile)

route.post("/passwordupdate", passwordupdateftn)

route.get("/searchuser", MustLogin, searchuser)

route.get("/searchalluser", MustLogin, searchalluser)

route.get("/searchuserwlgn", searchuserwihtoutlogin)

route.get("/removeProfilePic", MustLogin, removeProfilePic)

export default route