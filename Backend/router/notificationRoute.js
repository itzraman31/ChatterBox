import express from 'express';
import MustLogin from '../middleware/MustLogin.js'
import { getAllNotifications } from '../controller/notificationCont.js';
const notificationroute = express.Router();

notificationroute.get('/getallnotifications',MustLogin,getAllNotifications);

export default notificationroute
