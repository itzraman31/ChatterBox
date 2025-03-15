import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { datatransfer } from '../../App';

const url = "http://localhost:5500/api/auth/login";
const otpUrl = "http://localhost:5500/api/user/otp/gen";
const verifyOtpUrl = "http://localhost:5500/api/user/otp/verify";

const Login = () => {
  const { storetoken } = useContext(datatransfer);
  const [info, setinfo] = useState('');
  const [style, setstyle] = useState('red');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const [logininfo, setlogininfo] = useState({
    email: "",
    password: ""
  });

  // const sendLoginRequest = async (event) => {
  //   event.preventDefault();

  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify({ email: logininfo.email, password: logininfo.password }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });

  //   if (response.ok) {
  //     const result = await response.json();
  //     if (result.success) {
  //       setIsLoginSuccessful(true);

  //       const otpResponse = await fetch(otpUrl, {
  //         method: "POST",
  //         body: JSON.stringify({ email: logininfo.email }),
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       });

  //       if (otpResponse.ok) {
  //         const otpResult = await otpResponse.json();
  //         if (otpResult.success) {
  //           toast.success("OTP sent successfully", {
  //             position: "bottom-center",
  //             autoClose: 3000
  //           });
  //           setIsOtpSent(true);
  //         } else {
  //           toast.error(otpResult.message, {
  //             position: "bottom-center",
  //             autoClose: 3000
  //           });
  //         }
  //       } else {
  //         toast.error("Failed to send OTP", {
  //           position: "bottom-center",
  //           autoClose: 3000
  //         });
  //       }
  //     } else {
  //       toast.error(result.message, {
  //         position: "bottom-center",
  //         autoClose: 3000
  //       });
  //     }
  //   } else {
  //     toast.error("Login failed. Please check your credentials.", {
  //       position: "bottom-center",
  //       autoClose: 3000
  //     });
  //   }
  // };


  const sendLoginRequest = async (event) => {
    event.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: logininfo.email, password: logininfo.password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      if (result.isAuth===true) {
        setIsLoginSuccessful(true);
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
      } else {
        if (result.success) {
          storetoken(result);
          setinfo("Login successfully.");
          setstyle("green");
  
          setTimeout(() => {
            toast.success(`Welcome back ${result.name}`, {
              position: "bottom-center",
              autoClose: 3000
            });
            navigate('/');
          }, 500);
        } else {
          toast.error(result.msg, {
            position: "bottom-center",
            autoClose: 3000
          });
        }
      }
    } else {
      toast.error("Login failed. Please check your credentials.", {
        position: "bottom-center",
        autoClose: 3000
      });
    }
  };




  const verifyOtp = async (event) => {
    event.preventDefault();
    const response = await fetch(verifyOtpUrl, {
      method: "POST",
      body: JSON.stringify({ email: logininfo.email, password: logininfo.password, otp }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      const values = await response.json();
      console.log(values)
      if (values.success) {
        storetoken(values);
        setinfo("Login successfully.");
        setstyle("green");

        setTimeout(() => {
          toast.success(`Welcome back ${values.firstname}`, {
            position: "bottom-center",
            autoClose: 3000
          });
          navigate('/');
        }, 500);
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

  const changevalue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setlogininfo({
      ...logininfo,
      [name]: value
    });
  };

  return (
    <>
      <div className="loginouterdiv">
        <div className="logindiv">
          <div className="divgreen">
          </div>
          <div className='formdiv'>
            <h1 className="loginzara">Chatterbox - Login</h1>

            {!isLoginSuccessful ? (
              <form action="" className="logininfo" onSubmit={sendLoginRequest}>
                <h3>Email</h3>
                <input type="email" onChange={changevalue} value={logininfo.email} name='email' placeholder="Email" required />
                <h3>Password</h3>
                <input type="password" onChange={changevalue} value={logininfo.password} name='password' placeholder="Password" required />
                <input className="submit" type="submit" value="Login" />
                <h4 style={{ marginRight: "65px", textAlign: "center" }}>Don't have an account <NavLink to="/signup">Sign up</NavLink></h4>
                <h4 style={{ marginRight: "65px", textAlign: "center" }}><NavLink to="/forgotpassword">Forgot password?</NavLink></h4>
                <h4 style={{ marginRight: "65px", marginTop: "5px", textAlign: 'center', color: `${style}`, fontFamily: "sans-serif" }}>{info}</h4>
              </form>
            ) : !isOtpSent ? (
              <h4>Sending OTP...</h4>
            ) : (
              <form action="" className="logininfo" onSubmit={verifyOtp}>
                <h3>Enter OTP</h3>
                <input type="text" onChange={(e) => setOtp(e.target.value)} value={otp} placeholder="Enter OTP" required />
                <div className='resendotpdiv'>
                  <input className="submit" type="submit" value="Verify OTP" />

                  <button type="button" className="submit resendotp" onClick={resendOtp}>Resend OTP</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
