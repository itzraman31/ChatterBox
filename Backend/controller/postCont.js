import Signup from '../models/signup.js';
import cloudinaryUploads from '../cloudinary/cloudinaryConfig.js';
import Post from '../models/posts.js';
import Userprofile from '../models/Userprofile.js'

const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const createdBy = req.user.id;

        const avatar = req.file?.path

        if (!avatar) {
            res.status(404).send("Avatar not found")
        }

        const uploadOrNot = await cloudinaryUploads(avatar);
        const profilepic = uploadOrNot.url;

        if (uploadOrNot === undefined || profilepic === undefined) {
            res.status(404).json({ msg: "Image has not upload on cloudinary" })
        }

        const newPost = new Post({
            content,
            images: profilepic || [],
            createdBy,
        });

        const savedPost = await newPost.save();
        
        const UpdateNoPosts1=await Post.countDocuments({createdBy})
        await Userprofile.updateOne({user:createdBy},{$set:{posts:UpdateNoPosts1}});

        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = await Post.find({ createdBy: userId })
            .populate('createdBy', 'firstname email profilepic')
            .populate('comments.commentedBy', 'firstname email profilepic')
            .sort({ createdAt: -1 })

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
};

const likePost = async (data) => {
    try {

        const post = await Post.findById(data.postId)

        if (!post) {
            return { status: 200, message: 'Post not found' }
        }

        if (post.likes.includes(data.userId)) {
            post.likes = post.likes.filter((like) => like.toString() !== data.userId)
            await post.save();
            return { status: 200, message: 'Post unliked successfully' };
        }
        else {
            post.likes.push(data.userId)
            await post.save()
            return { status: 200, message: 'Post liked successfully' }
        }

    } catch (error) {
        return { status: 200, message: 'Failed to like post' };
    }
};

const commentOnPost = async (commentData) => {
    try {
        const { _id, commentedBy, commentText, postId } = commentData;

        const user = await Signup.findOne({ _id: commentedBy });
        if (!user) return { status: 404, message: 'User not found' };

        const post = await Post.findById(postId);
        if (!post) return { status: 404, message: 'Post not found' };

        const newComment = {
            commentText,
            commentedBy: user._id,
            commentedAt: new Date(),
        };

        post.comments.push(newComment);

        await post.save();

        return { status: 200, message: 'Comment added successfully', post };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Failed to add comment', error: error.message };
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
};

export {
    createPost,
    getAllPosts,
    likePost,
    commentOnPost,
    deletePost,
};
