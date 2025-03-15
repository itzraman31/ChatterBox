import Signup from '../models/signup.js'
import Allmessage from "../models/AllMessage.js"
import UserSpecific from "../models/UserSpecific.js"
import cloudinaryUploads from '../cloudinary/cloudinaryConfig.js'
import Contact from "../models/contactus.js";
import { io, onlineusers } from '../Socket/Socket.js';
import posts from '../models/posts.js';

const home = (req, res) => {
    res.cookie("greeting", "Hello world").send("Done")
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkmail = await Signup.findOne({ email: email });

        if (checkmail) {
            const pass = await checkmail.checkpass(password);

            if (pass) {
                const token = await checkmail.createToken();
                const isAuth=checkmail.authentication;
                return res.status(200).cookie("sId", "helloworld", {
                    httpOnly: true
                }).json({
                    success: true,
                    isAuth:isAuth,
                    name: checkmail.firstname,
                    token: token
                });
            } else {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid details"
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                msg: "Invalid details"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, gender } = req.body;

        const avatar = req.file?.path || "not found"

        if (!avatar) {
            res.status(404).send("Avatar not found")
        }
        const uploadOrNot = await cloudinaryUploads(avatar);
        var profilepic = uploadOrNot.url;

        if (uploadOrNot === undefined || profilepic === undefined) {
            res.status(409).json({ msg: "Unsupported image type" })
        }

        if (firstname === "" || lastname === "" || email === "" || password === "" || gender === "") {
            res.status(409).json({ msg: "All fields are required" })
        }

        // var profilepic = "";

        // if (gender === "male") {
        //     profilepic = `https://avatar.iran.liara.run/public/boy/?username=${firstname}`
        // }
        // else {
        //     profilepic = `https://avatar.iran.liara.run/public/girl/?username=${firstname}`
        // }
        const finduser = await Signup.findOne({ email: email })

        if (finduser) {
            res.status(400).json({ msg: "User Already exist" });
            console.log("Already user exist")
        }
        else {
            const createuser = await Signup.create({ firstname, lastname, email, password, gender, profilepic })
            const jwtoken = await createuser.createToken();
            res.status(200).json({
                token: jwtoken,
                user: createuser
            });
            console.log("User created")
        }

    } catch (error) {
        console.log(error)
    }
}

const user = async (req, res) => {
    try {
        const userdetail = req.user
        res.status(200).json(userdetail)
    }
    catch (err) {
        res.status(401).send(err)
    }
}

const deleteuser = async (req, res) => {

    try {

        const { email, password } = req.body

        const finduser = await Signup.findOne({ email: email })

        if (finduser) {
            const pass = await finduser.checkpass(password)
            const id = finduser._id;

            if (pass) {
                await Signup.deleteOne({ email })
                await Allmessage.deleteMany({
                    $or: [{ senderId: id }, { receiverId: id }],
                });

                await UserSpecific.deleteMany({
                    users: { $all: [id, id] }
                })

                await posts.deleteMany({ createdBy: id });

                // Log the number of posts deleted
                // console.log("Number of posts deleted:", deletedPosts.deletedCount);

                console.log("User deleted successfully")
                io.emit('deleteduser', id);
                res.status(200).send("User delete successfully")
            }
            else {
                res.status(401).send("Invalid details")
            }
        }
        else {
            res.status(401).send("Invalid details")
        }
    }
    catch (err) {
        res.status(401).send(err);
    }
}

const updateprofile = async (req, res) => {
    try {
        const id = req.query.id;
        const { firstname, lastname } = req.body;
        const checkuser = await Signup.findByIdAndUpdate({ _id: id }, { firstname, lastname }, { new: true }).select({ password: 0 });

        if (checkuser) {
            io.emit('allonlineusers', onlineusers);
            res.status(200).send(checkuser)
        }
        else {
            res.status(404).send("Cannot modify the document")
        }
    }

    catch (error) {
        res.send(error)
    }
}

//  To search a field in DB with starting character we can use `^${yourChar}`
//  To search a field in DB with ending character we can use `${yourChar}$`
const searchuser = async (req, res) => {
    try {
        const username = req.query.search

        const name = username ? { firstname: { $regex: `^${username}`, $options: "i" } } : {};
        const users = await Signup.find(name).find({ _id: { $ne: req.user._id } }).select("-password");

        if (users.length !== 0) {
            res.status(200).json({ users: users })
        }
        else {
            res.status(404).json("No record found")
        }
    }
    catch (err) {
        console.log(err)
    }
}

const searchuserwihtoutlogin = async (req, res) => {
    try {
        const username = req.query.search
        const name = username ? { firstname: { $regex: username, $options: "i" } } : {};
        const users = await Signup.find(name).select("-password");

        if (users.length !== 0) {
            res.status(200).send(users)
        }
        else {
            res.status(404).send("No User found in record")
        }
    }
    catch (err) {
        console.log(err)
    }
}

const searchalluser = async (req, res) => {
    try {

        const users = await Signup.find({ _id: { $ne: req.user._id } }).select("-password");

        if (users.length !== 0) {
            res.status(200).json({ users: users })
        }

        else {
            res.status(404).json("No record found")
        }
    }
    catch (err) {
        console.log(err)
    }
}


const ContactusForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        return res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return res.status(500).json({ error: "Server error, please try again later" });
    }
};

export { ContactusForm, searchalluser, home, login, signup, user, deleteuser, updateprofile, searchuser, searchuserwihtoutlogin }


