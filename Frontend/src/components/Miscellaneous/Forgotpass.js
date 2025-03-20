import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const otpUrl = "http://localhost:5500/api/user/otp/gen";
const otpUrl2 = "http://localhost:5500/api/user/otp/getotpbackuplogin";
const verifyOtpUrl = "http://localhost:5500/api/user/otp/verifyotp";
const verifyOtpUrl2 = "http://localhost:5500/api/user/otp/verifyotpbackuplogin";
const forgotUrl = "http://localhost:5500/api/forget/password";

const Forgotpass = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setisVerified] = useState(false)
    const navigate = useNavigate();
    const [isBackupMailUse, setisBackupMailUse] = useState(false)
    const [backupMail, setbackupMail] = useState('')

    const [logininfo, setlogininfo] = useState({
        email: "",
        otp: ""
    });
    const [password, setpassword] = useState({
        newpass: "",
        confirmpass: ""
    });

    const sendLoginRequest = async (event) => {
        event.preventDefault();
        const otpResponse = await fetch(otpUrl, {
            method: "POST",
            body: JSON.stringify( { email: logininfo.email }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (otpResponse.ok) {
            const otpResult = await otpResponse.json();
            if (otpResult.success) {
                toast.success("OTP sent successfully", {
                    position: "bottom-center",
                    autoClose: 3000
                });
                setIsOtpSent(true);
            } else {
                toast.error(otpResult.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        } else {
            toast.error("Failed to send OTP", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };
    const sendLoginRequest2 = async (event) => {
        event.preventDefault();
        console.log(backupMail);
        const otpResponse = await fetch(otpUrl2, {
            method: "POST",
            body: JSON.stringify( { backupmail: backupMail ,email: logininfo.email}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (otpResponse.ok) {
            const otpResult = await otpResponse.json();
            if (otpResult.success) {
                toast.success("OTP sent successfully", {
                    position: "bottom-center",
                    autoClose: 3000
                });
                setIsOtpSent(true);
            } else {
                toast.error(otpResult.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        } else {
            toast.error("Failed to send OTP", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        const response = await fetch(verifyOtpUrl, {
            method: "POST",
            body: JSON.stringify({ email: logininfo.email, otp: logininfo.otp }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const values = await response.json();
            if (values.success) {
                setisVerified(true)
            } else {
                toast.error(values.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        } else {
            toast.error("Verification failed", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };

    const verifyOtp2 = async (event) => {
        event.preventDefault();
        const response = await fetch(verifyOtpUrl2, {
            method: "POST",
            body: JSON.stringify({ email: logininfo.email, otp: logininfo.otp }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const values = await response.json();
            if (values.success) {
                setisVerified(true)
            } else {
                toast.error(values.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        } else {
            toast.error("Verification failed", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };

    const resendOtp = async () => {
        const otpResponse = await fetch(otpUrl, {
            method: "POST",
            body: JSON.stringify({ email: logininfo.email }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (otpResponse.ok) {
            const otpResult = await otpResponse.json();
            if (otpResult.success) {
                toast.success("OTP resent successfully", {
                    position: "bottom-center",
                    autoClose: 3000
                });
            } else {
                toast.error(otpResult.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        } else {
            toast.error("Failed to resend OTP", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };

    const changepasswordForm = async (event) => {
        event.preventDefault();
        const otpResponse = await fetch(forgotUrl, {
            method: "POST",
            body: JSON.stringify({ email: logininfo.email, newpass: password.newpass, confirmpass: password.confirmpass }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (otpResponse.ok) {
            const otpResult = await otpResponse.json();
            if (otpResult.success) {

                setTimeout(() => {
                    toast.success("Password change successfully", {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                    navigate('/login');
                }, 500);

                setIsOtpSent(true);
            } else {
                toast.error(otpResult.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        } else {
            toast.error("Failed to change password", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };


    const changevalue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setlogininfo({
            ...logininfo,
            [name]: value
        });
    };
    const changepassword = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setpassword({
            ...password,
            [name]: value
        });
    };

    const tryotherway = () => {
        setisBackupMailUse(true);
    }
    const changevaluebackupmail = (e) => {
        setbackupMail(e.target.value);
    }
    return (
        <>
            <div className="forgetpass-container">
                <h1 className="forgetpass-title">Forgot Password</h1>

                {isBackupMailUse ?
                    <form className="forgetpass-form" onSubmit={isOtpSent ? verifyOtp2 : sendLoginRequest2}>
                        <label className="forgetpass-label">Email</label>
                        <input
                            className="forgetpass-input"
                            disabled={isVerified}
                            type="email"
                            onChange={changevalue}
                            value={logininfo.email}
                            name="email"
                            placeholder="Enter email"
                            required
                        />
                        {
                            isBackupMailUse ?
                                <input
                                    className="forgetpass-input"
                                    type="email"
                                    onChange={changevaluebackupmail}
                                    value={backupMail}
                                    name="backupmail"
                                    placeholder="Enter Backup email"
                                    required
                                />
                                : null
                        }

                        {!isVerified && isOtpSent ? (
                            <div className="forgetpass-otp-section">
                                <label className="forgetpass-label">OTP</label>
                                <input
                                    className="forgetpass-input"
                                    type="text"
                                    onChange={changevalue}
                                    value={logininfo.otp}
                                    name="otp"
                                    placeholder="Enter OTP"
                                    required
                                />
                                <input className="forgetpass-btn" type="submit" value="Verify OTP" />
                            </div>
                        ) : null}

                        {!isOtpSent && (
                            <div className='otherway'>
                                <input className="forgetpass-btn" type="submit" value="Get OTP" />
                                {
                                    !isBackupMailUse ?
                                        <button onClick={tryotherway} className="forgetpass-btn">Try another way</button>
                                        : null
                                }
                            </div>
                        )}
                    </form>
                    :
                    <form className="forgetpass-form" onSubmit={isOtpSent ? verifyOtp : sendLoginRequest}>
                        <label className="forgetpass-label">Email</label>
                        <input
                            className="forgetpass-input"
                            disabled={isVerified}
                            type="email"
                            onChange={changevalue}
                            value={logininfo.email}
                            name="email"
                            placeholder="Enter email"
                            required
                        />
                        {!isVerified && isOtpSent ? (
                            <div className="forgetpass-otp-section">
                                <label className="forgetpass-label">OTP</label>
                                <input
                                    className="forgetpass-input"
                                    type="text"
                                    onChange={changevalue}
                                    value={logininfo.password}
                                    name="otp"
                                    placeholder="Enter OTP"
                                    required
                                />
                                <input className="forgetpass-btn" type="submit" value="Verify OTP" />
                            </div>
                        ) : null}

                        {!isOtpSent && (
                            <div className='otherway'>
                                <input className="forgetpass-btn" type="submit" value="Get OTP" />
                                <button onClick={tryotherway} className="forgetpass-btn">Try another way</button>
                            </div>
                        )}
                    </form>}
                {isVerified && (
                    <form className="forgetpass-form" onSubmit={changepasswordForm}>
                        <div className="forgetpass-reset-section">
                            <label className="forgetpass-label">New Password</label>
                            <input
                                className="forgetpass-input"
                                type="password"
                                onChange={changepassword}
                                value={password.newpass}
                                name="newpass"
                                placeholder="Enter new password"
                                required
                            />

                            <label className="forgetpass-label">Confirm Password</label>
                            <input
                                className="forgetpass-input"
                                type="password"
                                onChange={changepassword}
                                value={password.confirmpass}
                                name="confirmpass"
                                placeholder="Confirm new password"
                                required
                            />

                            <input className="forgetpass-btn" type="submit" value="Change Password" />
                        </div>
                    </form>
                )}
            </div>

        </>
    )
}

export default Forgotpass
