import UserProfile from "../models/Userprofile.js";

const followUser = async (req, res) => {
    try {
        const userId = req.query.userId;
        const tofollowUser = req.query.tofollowUser;

        if (!userId || !tofollowUser) {
            return res.status(400).json({ error: "Both userId and tofollowUser are required." });
        }

        const followingUserProfile = await UserProfile.findOne({ user: userId });
        const followUserProfile = await UserProfile.findOne({ user: tofollowUser });

        if (!followingUserProfile || !followUserProfile) {
            return res.status(404).json({ error: "User not found." });
        }

        if (!followUserProfile.followers.includes(userId)) {
            followUserProfile.followers.push(userId);
            await followUserProfile.save();
        }

        console.log(`User ${userId} is now following ${tofollowUser}`);

        res.status(200).json({ message: "Follow successful." });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export { followUser };
