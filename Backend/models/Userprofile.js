import mongoose from "mongoose"

const userprofile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
        required: true
    },    
    posts: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    description:{
        type:String,
        default:null
    }
}, {
    timestamps: true
})

const Userprofile = mongoose.model("userprofile", userprofile)


export default Userprofile