import express from 'express';
import MustLogin from '../middleware/MustLogin.js'
import { followUser,unfollowUser } from '../controller/followCont.js';
const Followrouter = express.Router();

Followrouter.post('/follow',MustLogin,followUser);
Followrouter.post('/unfollow',MustLogin,unfollowUser);

export default Followrouter
