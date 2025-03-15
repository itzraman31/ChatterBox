import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { datatransfer } from '../../App';
import { useEffect } from 'react';

const otpUrl = "http://localhost:5500/api/user/otp/gen";
const otpUrlTurnOff = "http://localhost:5500/api/user/otp/genoff";
const Privacy = () => {
  const { userdetail,getuserdetail } = useContext(datatransfer);
  const [is2FaOn, setis2FaOn] = useState(userdetail.authentication)
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  console.log(userdetail.authentication)

  const verifyOtpTurnOff = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5500/api/user/otp/verifyturnoff/?id=${userdetail._id}`, {
      method: "POST",
      body: JSON.stringify({ email: userdetail.email, otp }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const values = await response.json();
      if (values.success) {
        await getuserdetail();
        setis2FaOn(false);
        setIsOtpSent(false);
        setTimeout(() => {
          toast.success(`2FA is Off`, {
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
      setOtp('');

    } else {
      toast.error("Verification failed", {
        position: "bottom-center",
        autoClose: 3000
      });
    }
  };
  const getotp = async () => {

    const otpResponse = await fetch(otpUrl, {
      method: "POST",
      body: JSON.stringify({ email: userdetail.email }),
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

  };
  const verifyOtp = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5500/api/user/otp/verifyauth/?id=${userdetail._id}`, {
      method: "POST",
      body: JSON.stringify({ email: userdetail.email, otp }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const values = await response.json();
      await getuserdetail();
      if (values.success) {
        setIsOtpSent(false);
        setis2FaOn(true);
        setTimeout(() => {
          toast.success(`2FA is On`, {
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
      setOtp('');

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
      body: JSON.stringify({ email: userdetail.email }),
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

  useEffect(() => {
  }, []);

  return (
    <>
      <div className='twoFAouterdiv'>
        <img src="/images/twoFA.png" alt="2FA img" />

        <div className='twoFAinnerdiv'>
          <div className='twoFAinnerdiv2'>
            <h2>Two Factor Authentication</h2>
            <p>A verification code will sent to your email.</p>
            {
              !isOtpSent ?
                <button type="button" className="submit turnon" onClick={getotp}>{userdetail.authentication?"Turn Off":"Turn On"}</button>
                :
                <div className='twoFAinnerdiv3'>
                  
                  <form action="" className="logininfo2" onSubmit={userdetail.authentication?verifyOtpTurnOff:verifyOtp}>
                    <h3>Enter OTP</h3>
                    <input type="text" onChange={(e) => setOtp(e.target.value)} value={otp} placeholder="Enter OTP" required />
                    <div className='resendotpdiv'>
                      <input className="submit" type="submit" value="Verify OTP" />
                      <button type="button" className="submit" onClick={resendOtp}>Resend OTP</button>
                    </div>
                  </form>

                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Privacy


