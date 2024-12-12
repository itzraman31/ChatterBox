import mongoose from "mongoose";

const userspecific=new mongoose.Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signup"
    }],
    messageId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AllMessage"
    }]
},{
    timestamps:true
})

const UserSpecific=mongoose.model("Userspecific",userspecific);
export default UserSpecific