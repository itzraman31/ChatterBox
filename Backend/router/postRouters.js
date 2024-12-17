import express from 'express';
import { createPost, getAllPosts, likePost, unlikePost, commentOnPost, deletePost } from '../controller/postCont.js';
import authenticate from '../middleware/MustLogin.js'; // Middleware for authentication
import upload from '../middleware/MulterMiddleware.js';

const Postrouter = express.Router();

Postrouter.post('/create', authenticate,upload.single("avatar"), createPost);
Postrouter.get('/getAllPosts/:id/', authenticate, getAllPosts);
Postrouter.put('/like/:postId', authenticate, likePost);
Postrouter.put('/unlike/:postId', authenticate, unlikePost);
Postrouter.post('/comment/:postId', authenticate, commentOnPost);
Postrouter.delete('/:postId', authenticate, deletePost);

export default Postrouter
