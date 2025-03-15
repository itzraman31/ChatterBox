import { generateUserOtp,verifyUserOtp,verifyUserOtp2,verifyUserOtpTurnoff } from "../controller/otpCont.js";
import express from 'express';
const userRouter = express.Router();

userRouter.post('/otp/gen', generateUserOtp)
userRouter.post('/otp/verify', verifyUserOtp)
userRouter.post('/otp/verifyturnoff', verifyUserOtpTurnoff)
userRouter.post('/otp/verifyauth', verifyUserOtp2)

export default userRouter;