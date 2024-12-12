import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup=new mongoose.Schema({
    firstname:{
        type:String,
        required:true        
    },
    lastname:{
        type:String,
        required:true        
    },
    email:{
        type:String,
        required:true        
    },
    password:{
        type:String,
        required:true        
    },
    gender:{
        type:String,
        require:true
    },
    profilepic:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

signup.pre('save',async function(){
    const hashpass= await bcrypt.hash(this.password,10)
    this.password=hashpass;
    return;
})

signup.methods.checkpass= async function(pass){
    
     return bcrypt.compare(pass,this.password)
}

signup.methods.createToken=async function(){
    return jwt.sign({
        id:this._id,
        email:this.email,
        usnmae:this.firstname
    },
    process.env.sign
)
}

const Signup=mongoose.model("signup",signup)


export default Signup