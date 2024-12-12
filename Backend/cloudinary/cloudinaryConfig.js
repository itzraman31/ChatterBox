import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const cloudinaryUploads = async (localFilePath) => {
    try {
        if (!localFilePath) {
            res.status(401).send("Local Path is required");
        }

        const avatarUploadOnCloudinary = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image"
        })
        return avatarUploadOnCloudinary;

    } catch (error) {
        console.log("Files did'nt uplaod on cloudinary");
        fs.unlinkSync(localFilePath);
        return;
    }
}

export default cloudinaryUploads