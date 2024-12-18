import jwt from "jsonwebtoken";
import Signup from "../models/signup.js";

const mustlogin = async (req, res, next) => {

    const token = req.header("Authorization")

    if (!token) {
        console.log("Token not provided")
        res.status(401).send("Token not provided")
    }
    try {
        const check = await jwt.verify(token, process.env.sign);
        const data = await Signup.findOne({ email: check.email })
        req.user = data;
        if (!check) {
            res.status(401).send("Invalid token")
            next();
        }
        req.id = check.id;
        next();
    } catch (error) {
        console.log(error + " this is error from mustlogin")
        res.status(401).send("This is JWT Token Error in MustLogin Middleware")
    }
}

export default mustlogin