import Notification from "../models/notification.js"

const saveNotificationToDB = async (data, res) => {
    try {
        const { receiverId, senderId, message } = data;

        await Notification.create({
            sender: senderId,
            receiver: receiverId,
            message: message
        });

        const allnotification=await Notification.find({receiver:receiverId});

        const result = {
            success: true,
            data: allnotification,
            message: "notification-control"
        }
        
        return result;

    }
    catch (err) { }
}

const getAllNotifications=async(req,res)=>{
    try {
        const id=req.user._id;

        const allnotification=await Notification.find({receiver:id});

        console.log(allnotification)

        res.status(200).json({data:allnotification});

    } catch (error) {
        console.log(error);
    }
}

export { saveNotificationToDB,getAllNotifications }
