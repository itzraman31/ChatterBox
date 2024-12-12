import mongoose from "mongoose";

const allmessages= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Signup",
        require:true
    },
    message:{
        type:String,
        require:true
    }

},{
    timestamps:true
})

const Allmessage=mongoose.model("AllMessage",allmessages);
export default Allmessage