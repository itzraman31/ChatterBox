import UserSpecific from '../models/UserSpecific.js'
import Allmessages from '../models/AllMessage.js'
import { io,getReceiverSocketId } from '../Socket/Socket.js';

const sendmessage = async (req, res) => {
    try {
        const { message } = req.body;
        const senderId = req.id;
        const receiverId = req.params.id;

        let checkuser = await UserSpecific.findOne({
            users: { $all: [senderId, receiverId] }
        })

        if (!checkuser) {
            checkuser = await UserSpecific.create({
                users: [senderId, receiverId]
            })
        }

        const pushtoAllmsg = await Allmessages.create({ senderId, receiverId, message });

        if (pushtoAllmsg) {
            checkuser.messageId.push(pushtoAllmsg._id);
        }
        
        await checkuser.save();

        const receiversocket=await getReceiverSocketId(receiverId);

        if(receiversocket){
        
            io.to(receiversocket).emit("newMessage",pushtoAllmsg);
        }
        else{
            console.log("didnt get it")
        }
        res.status(200).send(pushtoAllmsg)
    }
    catch (error) {
        console.log(error)
    }
}

const getmessage = async (req, res) => {
    try{

        const receiverId = req.params.id;
        const senderId = req.id;
        
        let checkuser = await UserSpecific.findOne({
            users: { $all: [senderId, receiverId] }
        })
        
        if (!checkuser) {
            res.status(200).send({id:"123",message:"no message found",found:false});
            return;
        }
        
        const data = await checkuser.populate("messageId");
        const msgonly = data.messageId;
        res.status(200).json({msgonly:msgonly,found:true})
    }
    catch(err)
    {
        console.log(err)
    }
}
export { sendmessage, getmessage }