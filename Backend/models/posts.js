import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            type: String,
            required: false,
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'signup',
        },
    ],
    comments: [
        {
            commentText: { type: String, required: true },
            commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'signup', required: true },
            commentedAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Post', postSchema);
