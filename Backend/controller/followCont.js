import UserProfile from "../models/Userprofile.js";

const followUser = async (req, res) => {
    try {
        const userId = req.query.userId;  // current login user
        const tofollowUser = req.query.tofollowUser;  // user to whom curretly user will follow

        if (!userId || !tofollowUser) {
            return res.status(400).json({ error: "Both userId and tofollowUser are required." });
        }

        const CurrUserId = await UserProfile.findOne({ user: userId });
        const tofollowUserId = await UserProfile.findOne({ user: tofollowUser });

        if (!CurrUserId || !tofollowUserId) {
            return res.status(404).json({ error: "User not found." });
        }

        if (!CurrUserId.following.includes(tofollowUser)) {
            CurrUserId.following.push(tofollowUser);
            await CurrUserId.save();
        }

        if (!tofollowUserId.followers.includes(userId)) {
            tofollowUserId.followers.push(userId);
            await tofollowUserId.save();
        }

        // console.log(`User ${userId} is now following ${tofollowUser}`);
        // console.log(`User ${tofollowUser} has one more follower ${userId}`);

        res.status(200).json({ message: "Follow successful." });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const userId = req.query.userId;  // current login user
        const tounfollowUser = req.query.tounfollowUser;  // user to whom curretly user will follow

        if (!userId || !tounfollowUser) {
            return res.status(400).json({ error: "Both userId and tofollowUser are required." });
        }

        const CurrUserId = await UserProfile.findOne({ user: userId });
        const tounfollowUserId = await UserProfile.findOne({ user: tounfollowUser });

        if (!CurrUserId || !tounfollowUserId) {
            return res.status(404).json({ error: "User not found." });
        }

        if (CurrUserId.following.includes(tounfollowUser)) {
            CurrUserId.following=CurrUserId.following.filter((unfollowUser)=> unfollowUser.toString() !== tounfollowUser );
            await CurrUserId.save();
        }
        
        if (tounfollowUserId.followers.includes(userId)) {
            tounfollowUserId.followers=tounfollowUserId.followers.filter((data)=> data.toString() !== userId );
            await tounfollowUserId.save();
        }

        res.status(200).json({ message: "Unfollow successful." });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export { followUser,unfollowUser };
