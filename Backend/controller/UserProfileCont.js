import Userprofile from "../models/Userprofile.js";

const fetchUserProfile=async(req,res)=>{
    const id=req.params.id;
    const Userfind=await Userprofile.findOne({user:id}).populate('user', 'firstname lastname email profilepic');

    if(!Userfind){
        res.status(404).json({message:"Not found"});
    }
    res.status(200).json({user:Userfind,message:"Found"});

}

const fetchLoginuserProfile=async(req,res)=>{
    
    const id=req.user._id;

    const Userfind=await Userprofile.findOne({user:id}).populate('user', 'firstname lastname email profilepic');

    if(!Userfind){
        res.status(404).json({message:"Not found"});
    }
    res.status(200).json({user:Userfind,message:"Found"});

}


export {fetchUserProfile,fetchLoginuserProfile}