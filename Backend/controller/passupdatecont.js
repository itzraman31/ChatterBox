import Signup from '../models/signup.js'
import bcrypt from 'bcrypt'

const passwordupdateftn=async(req,res)=>{
    try{
        const id=req.query.id;
        const {oldpass,newpass}=req.body;
        const userfind=await Signup.findOne({_id:id})
        
        const passcheck=await userfind.checkpass(oldpass);
        
        if(passcheck)
            {
                const hashpass=await bcrypt.hash(newpass,10);
                const user=await Signup.findByIdAndUpdate({_id:id},{password:hashpass},{new:true}).select({password:0})
                res.status(200).send(user);
            }
            else{
                res.status(401).send("Invalid passowrd")
            }
    }
    catch(err)
    {
        res.send(err)
    }
}

export default passwordupdateftn