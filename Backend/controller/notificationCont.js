import Notification from "../models/notification.js"
import Signup from '../models/signup.js'

const saveNotificationToDB = async (data) => {
    try {
        const { receiverId, senderId, type } = data;

        const senderuser=await Signup.findOne({_id:senderId});

        let message = "";
        if(type==="follow"){
            message=`${senderuser.firstname} has started following you.`
        }

        await Notification.create({
            sender: senderId,
            receiver: receiverId,
            type: type,
            message:message
        });

        const allnotification = await Notification.find({ receiver: receiverId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'sender',
                select: 'firstname profilepic'
        });

        console.log(allnotification)

        // console.log(message)


        const result = {
            success: true,
            data: allnotification,
        }
        
        return result;

    }
    catch (err) { }
}

const getAllNotifications = async (req, res) => {
    try {
        const id = req.user._id;

        const allnotification = await Notification.find({ receiver: id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'sender',
                select: 'firstname profilepic'
        });

        res.status(200).json({ data: allnotification });

    } catch (error) {
        console.log(error);
    }
}

export { saveNotificationToDB, getAllNotifications }
