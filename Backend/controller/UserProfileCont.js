import Userprofile from "../models/Userprofile.js";

const fetchUserProfile = async (req, res) => {
    const id = req.params.id;
    const Userfind = await Userprofile.findOne({ user: id }).populate('user', 'firstname lastname email profilepic');

    if (!Userfind) {
        res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ user: Userfind, message: "Found" });

}

const fetchLoginuserProfile = async (req, res) => {

    const id = req.user._id;

    const Userfind = await Userprofile.findOne({ user: id }).populate('user', 'firstname lastname email profilepic');

    if (!Userfind) {
        res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ user: Userfind, message: "Found" });

}
const updateprofile = async (req, res) => {
    try {
        const id = req.user._id.toString();
        const { description } = req.body;

        // const user = await Userprofile.findOne({ user: id });
        
        const updateduser = await Userprofile.findOneAndUpdate({ user: id }, { description: description }, { new: true }).select({ password: 0 })
        if (updateduser) {
            res.status(200).send({ message: "profile change successfully" })
            return;
        }
        res.status(400).send({ message: "some error occured" })
    }
    catch (err) {
        res.status(400).send({ message: "some error occured" })
    }
}

export { fetchUserProfile, fetchLoginuserProfile, updateprofile }