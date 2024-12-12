import Signup from '../models/signup.js'
import cloudinaryUploads from '../cloudinary/cloudinaryConfig.js';

const removeProfilePic = async (req, res) => {
    const currUser = req.user;
    const GuestPicPath = "public/temp/guest.png";
    const UploadOnCloudinary = await cloudinaryUploads(GuestPicPath);
    const user = await Signup.findByIdAndUpdate({ _id: currUser._id }, { profilepic: UploadOnCloudinary.url }, { new: true }).select({ password: 0 })
    res.status(200).send("Remove Successfully");
}

const updateprofilepic = async (req, res) => {
    const userId = req.params.id;
    const avatar = req.file?.path || "not found"

    if (!avatar) {
        res.status(404).send("Avatar not found")
    }

    const uploadOrNot = await cloudinaryUploads(avatar);
    const profilepic = uploadOrNot.url;

    if (uploadOrNot === undefined || profilepic === undefined) {
        res.status(409).json({ msg: "Image has not upload on cloudinary" })
    }

    const user = await Signup.findByIdAndUpdate({ _id: userId }, { profilepic }, { new: true }).select({ password: 0 })
    res.status(200).send("Update Successfully");

}
export { removeProfilePic, updateprofilepic }