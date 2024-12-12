import express from 'express'
import { sendmessage, getmessage } from '../controller/messageCont.js'
import MustLogin from '../middleware/MustLogin.js'
const router = express.Router();

router.post('/send/:id/', MustLogin, sendmessage);

router.get('/get/:id', MustLogin, getmessage);

export default router