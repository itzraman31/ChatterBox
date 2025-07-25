import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { datatransfer } from '../../App';

const BackupMail = () => {
    const { userdetail } = useContext(datatransfer)
    const [mail, setmail] = useState('')
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setotp] = useState('')
    const [isBackMailaddedOrNot, setisBackMailaddedOrNot] = useState(false);

    const getBackMailaddedOrNot = async () => {
        const response = await fetch("http://localhost:5500/api/user/otp/getbackupmail", {
            method: "POST",
            body: JSON.stringify({ email: userdetail.email }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            setisBackMailaddedOrNot(true);
            setmail(data.backupemail)
        }
    }

    const getotp = async (event) => {
        event.preventDefault();
        const otpResponse = await fetch("http://localhost:5500/api/user/otp/otpbackupmail", {
            method: "POST",
            body: JSON.stringify({ email: userdetail.email, backupmail: mail }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (otpResponse.ok) {
            const otpResult = await otpResponse.json();
            if (otpResult.success) {
                setIsOtpSent(true);
                toast.success("OTP sent successfully", {
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
            toast.error("Failed to send OTP", {
                position: "bottom-center",
                autoClose: 3000
            });
        }

    }
    const verifyOtp = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5500/api/user/otp/verifyotpbackupmail/?id=${userdetail._id}`, {
            method: "POST",
            body: JSON.stringify({ backupmail: mail, email: userdetail.email, otp }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const values = await response.json();
            if (values.success) {
                setIsOtpSent(false);
                setisBackMailaddedOrNot(true)
                setTimeout(() => {
                    toast.success(`Backupmail added`, {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                }, 500);
            } else {
                toast.error(values.message, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
            setotp('');

        } else {
            toast.error("Verification failed", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };

    const editmail = () => {
        setisBackMailaddedOrNot(false)
    }

    useEffect(() => {
        getBackMailaddedOrNot();
    }, [])
    return (
        <>
            <div className='twoFAouterdiv'>
                <img className='backupimg' src="/images/backup.png" alt="2FA img" />

                <div className='twoFAinnerdiv'>
                    <div className='twoFAinnerdiv2'>
                        <h2>Backup mail</h2>
                        <p>Add backup mail for future recovery.</p>
                        <div className='twoFAinnerdiv gap'>
                            <form action="" className="backupmailform" onSubmit={getotp}>
                                <input disabled={isBackMailaddedOrNot || isOtpSent} type="text" onChange={(e) => setmail(e.target.value)} value={mail} placeholder="Enter mail" required />
                                {
                                    isBackMailaddedOrNot ?
                                        <button onClick={editmail} className="submit editbtn">Edit</button>
                                        :
                                        <input className="submit backupbtn" type="submit" value="Get OTP" />
                                }

                            </form>
                            {
                                isOtpSent ?
                                    <form action="" className="backupmailform" onSubmit={verifyOtp}>
                                        <input type="text" placeholder="Enter Otp" name='otp' value={otp} onChange={(e) => setotp(e.target.value)} required />
                                        <input className="submit backupbtn" type="submit" value="Verify" />
                                    </form>
                                    :
                                    <></>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BackupMail
