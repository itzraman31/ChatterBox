import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
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
    message: {
        type: String,
        require: true
    },
    others: {
        type: String,
        default: null
    }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification
