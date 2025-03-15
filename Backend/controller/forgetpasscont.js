import Signup from "../models/signup.js";
import bcrypt from 'bcrypt'

const forgetpass = async (req, res) => {
    try {
        const { email,newpass, confirmpass } = req.body;

        if (newpass !== confirmpass) {
           return res.status(401).json({
                success: false,
                message: "Passwords does'nt match"
            })
        }
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const hashpass=await bcrypt.hash(newpass,10);
        await Signup.updateOne({ email }, { $set: { password: hashpass } });
        
        res.status(200).send({
            success: true,
            message: "Passwords change successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
export { forgetpass }