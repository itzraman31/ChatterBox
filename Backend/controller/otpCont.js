import Signup from "../models/signup.js";
import { createTransport } from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const sendMail = (email, otp) => {
    const auth = createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "do.not.mail.2fa@gmail.com",
            pass: "bnfn sfnw elcv cusx"
        }
    });
    const reciever = {
        from: "do.not.mail.2fa@gmail.com",
        to: email,
        subject: "OTP verification required",
        text: `Hlw Please verify your account by this Otp ${otp}`
    }
    auth.sendMail(reciever, (error, emailRes) => {
        if (err) return;
        console.log('email sent.')
    });
}
const generateUserOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid details" })
        }

        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        sendMail(email, otp);
        console.log('otp is: ' + otp);
        await Signup.findByIdAndUpdate(user._id, { otp: otp });
        res.json({ success: true, message: "otp sent successfully." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const verifyUserOtp = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password) && otp === user.otp;
        console.log('otp in req ' + otp);
        console.log('otp in db: ' + user.otp);
        if (isMatch) {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                usnmae: user.firstname
            },
                process.env.sign
            )
            res.json({ success: true, token, firstname: user.firstname })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const verifyUserOtp2 = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = (otp === user.otp);

        console.log('otp in req ' + otp);
        console.log('otp in db: ' + user.otp);
        if (isMatch) {
            await Signup.updateOne({ email }, { $set: { authentication: true } });

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                usnmae: user.firstname
            },
                process.env.sign
            )
            res.json({ success: true, token, firstname: user.firstname })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const verifyUserOtp3 = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = (otp === user.otp);

        console.log('otp in req ' + otp);
        console.log('otp in db: ' + user.otp);
        if (isMatch) {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                usnmae: user.firstname
            },
                process.env.sign
            )
            res.json({ success: true, token, firstname: user.firstname })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const verifyUserOtpTurnoff = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const id = req.query.id;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = (otp === user.otp);

        console.log('otp in req ' + otp);
        console.log('otp in db: ' + user.otp);
        if (isMatch) {
            await Signup.updateOne({ email }, { $set: { authentication: false } });

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                usnmae: user.firstname
            },
                process.env.sign
            )
            res.json({ success: true, token, firstname: user.firstname })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const generateOtpBackupMail = async (req, res) => {
    try {
        const { email, backupmail } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid details" })
        }

        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        sendMail(backupmail, otp);
        console.log('otp is: ' + otp);
        await Signup.findByIdAndUpdate(user._id, { backupmailotp: otp });
        res.json({ success: true, message: "otp sent successfully." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const verifyotpBackupmail = async (req, res) => {
    try {
        const { backupmail,email, otp } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = (otp === user.backupmailotp);

        console.log('otp in req ' + otp);
        console.log('otp in db: ' + user.backupmailotp);
        if (isMatch) {
            await Signup.updateOne({ email }, { $set: { backupemail: backupmail } });

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                usnmae: user.firstname
            },
                process.env.sign
            )
            res.json({ success: true, token, firstname: user.firstname })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const getbackupmail=async(req,res)=>{
    const {email}=req.body
    if(email===null){
        return res.send(401)
    }
    const user=await Signup.findOne({email})

    if(user===null || user.backupemail===null){
       return res.status(401).json({message:"No backupmail is added"})
    }

    res.status(200).json({
        backupemail:user.backupemail
    })
}
const generateOtpBackupMail2 = async (req, res) => {
    try {
        const { email, backupmail } = req.body;
        const user = await Signup.findOne({ email })
        console.log(user.backupemail!==backupmail)
        if (!user || user.backupemail!==backupmail) {
            return res.json({ success: false, message: "Invalid details" })
        }

        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        sendMail(backupmail, otp);
        console.log('otp is: ' + otp);
        await Signup.findByIdAndUpdate(user._id, { backupmailloginotp: otp });
        res.json({ success: true, message: "otp sent successfully." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const verifyUserOtp4 = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = otp === user.backupmailloginotp;
        console.log('otp in req ' + otp);
        console.log('otp in db: ' + user.otp);
        if (isMatch) {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                usnmae: user.firstname
            },
                process.env.sign
            )
            res.json({ success: true, token, firstname: user.firstname })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { verifyUserOtp4,generateOtpBackupMail2,getbackupmail,verifyotpBackupmail,generateOtpBackupMail, sendMail, verifyUserOtp, generateUserOtp, verifyUserOtp2, verifyUserOtpTurnoff, verifyUserOtp3 }