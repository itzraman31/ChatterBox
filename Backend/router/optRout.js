import { generateUserOtp,verifyUserOtp } from "../controller/otpCont";
import express from 'express';
const userRouter = express.Router();

userRouter.post('/otp/gen', generateUserOtp)
userRouter.post('/otp/verify', verifyUserOtp)

export default userRouter;