
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



export const generateUserOtp = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        sendMail(email, otp);
        console.log('otp is: ' + otp);
        await Signup.findByIdAndUpdate(user.id, { otp: otp} );
        res.json({ success: true, message: "otp sent successfully." })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export const verifyUserOtp = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        const user = await Signup.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password) && otp === user.otp;
        console.log ('otp in req ' + otp);
        console.log('otp in db: '+ user.otp);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {sendMail,verifyUserOtp,generateUserOtp}