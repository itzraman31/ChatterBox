import Notification from "../models/notification.js"
const saveNotificationToDB = async (data) => {
    const { receiverId, senderId, message } = data;
    await Notification.create({ sender: senderId, receiver: receiverId, message: message })
    return;
}

export { saveNotificationToDB }