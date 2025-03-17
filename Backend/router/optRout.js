import { getbackupmail,verifyotpBackupmail,generateOtpBackupMail,generateUserOtp,verifyUserOtp,verifyUserOtp2,verifyUserOtp3,verifyUserOtpTurnoff } from "../controller/otpCont.js";
import express from 'express';
const userRouter = express.Router();

userRouter.post('/otp/gen', generateUserOtp)

userRouter.post('/otp/otpbackupmail', generateOtpBackupMail)
userRouter.post('/otp/verifyotpbackupmail', verifyotpBackupmail)
userRouter.post('/otp/getbackupmail', getbackupmail)

userRouter.post('/otp/verify', verifyUserOtp)
userRouter.post('/otp/verifyturnoff', verifyUserOtpTurnoff)
userRouter.post('/otp/verifyauth', verifyUserOtp2)
userRouter.post('/otp/verifyotp', verifyUserOtp3)


export default userRouter;