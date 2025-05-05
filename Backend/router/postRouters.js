import express from 'express';
import { createPost, getAllPosts, likePost, commentOnPost, deletePost } from '../controller/postCont.js';
import authenticate from '../middleware/MustLogin.js'; // Middleware for authentication
import upload from '../middleware/MulterMiddleware.js';
import { fetchUserProfile,fetchLoginuserProfile } from '../controller/UserProfileCont.js';
import mustlogin from '../middleware/MustLogin.js';

const Postrouter = express.Router();

Postrouter.post('/create', authenticate,upload.single("avatar"), createPost);
Postrouter.get('/getAllPosts/:id/', authenticate, getAllPosts);
Postrouter.put('/like/:postId', authenticate, likePost);
Postrouter.post('/comment/:postId', authenticate, commentOnPost);
Postrouter.delete('/deletepost/:postId', authenticate, deletePost);

Postrouter.get('/userprofile/:id', fetchUserProfile);
Postrouter.get('/loginuserprofile/:id', mustlogin,fetchLoginuserProfile);

export default Postrouter


// /api/post/userprofile