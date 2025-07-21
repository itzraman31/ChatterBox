import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
        required: true,
    },
    followers: [
        {
            followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup', required: true },
            acceptedAt: { type: Date, default: Date.now },
        },
    ],
    pending: [
        {
            followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup', required: true },
            reuestedAt: { type: Date, default: Date.now },
        },
    ],
    blocked: [
        {
            followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup', required: true },
            blockedAt: { type: Date, default: Date.now },
        },
    ]
});

export default mongoose.model('Follow', followSchema);
