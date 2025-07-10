const saveNotificationToDB = async (req, res) => {
    const {receiverId,message}=req.body;
    const senderId=req.user._id;
}

export {saveNotificationToDB}