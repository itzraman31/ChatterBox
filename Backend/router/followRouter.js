import express from 'express';
import MustLogin from '../middleware/MustLogin.js'
import { followUser } from '../controller/followCont.js';
const Followrouter = express.Router();

Followrouter.post('/follow',MustLogin,followUser);

export default Followrouter

// /api/post/userprofile