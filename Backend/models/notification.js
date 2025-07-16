import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    // This field now correctly refers to your user model
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
        required: true,
    },
    type: {
        type: String,
        enum: ['follow', 'like', 'comment'],
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    message:{
        type:String,
        default:"Not provided"
    },
},
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;