import express from 'express';
import { createPost, getAllPosts, likePost, commentOnPost, deletePost } from '../controller/postCont.js';
import authenticate from '../middleware/MustLogin.js'; // Middleware for authentication
import upload from '../middleware/MulterMiddleware.js';
import { fetchUserProfile } from '../controller/UserProfileCont.js';

const Postrouter = express.Router();

Postrouter.post('/create', authenticate,upload.single("avatar"), createPost);
Postrouter.get('/getAllPosts/:id/', authenticate, getAllPosts);
Postrouter.put('/like/:postId', authenticate, likePost);
Postrouter.post('/comment/:postId', authenticate, commentOnPost);
Postrouter.delete('/deletepost/:postId', authenticate, deletePost);

Postrouter.get('/userprofile/:id', fetchUserProfile);

export default Postrouter


// /api/post/userprofile