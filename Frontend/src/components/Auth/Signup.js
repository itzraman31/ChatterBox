import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendURL=process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
    const [isloading, setisloading] = useState(false)
    const navigate = useNavigate();

    const [signupinfo, setsignupinfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        avatar: null
    });

    const valuechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setsignupinfo({
            ...signupinfo,
            [name]: value
        });
    };

    const fileChange = (event) => {
        setsignupinfo({
            ...signupinfo,
            avatar: event.target.files[0]
        });
    };

    const submitform = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("firstname", signupinfo.firstname);
        formData.append("lastname", signupinfo.lastname);
        formData.append("email", signupinfo.email);
        formData.append("password", signupinfo.password);
        formData.append("gender", signupinfo.gender);
        formData.append("avatar", signupinfo.avatar);

        setisloading(true)
        const response = await fetch(`${backendURL}/api/auth/signup`, {
            method: "POST",
            body: formData
        });

        setisloading(false);
        if (response.ok) {

            setTimeout(() => {
                toast.success(`Account created, Login now`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
                navigate('/login');
            }, 500);

            setsignupinfo({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                gender: "",
                avatar: null
            });

        } else {
            const message = await response.json();
            toast.error(`${message.msg}`, {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };

    return (
        <>
            <div className="outerdiv">
                {isloading && (
                    <div className="spinner-overlay">
                        <img src="gif2.gif" alt="Loading..." className="spinner" />
                        <h2 style={{ color: "white" }}>Creating your account...</h2>
                    </div>
                )}
                <div className="logindivsignup">
                    <div className="divgreensignup"></div>
                    <div className='formdiv'>
                        <h1 className="loginzara">Chatterbox - sign up</h1>
                        <form className="logininfosignup" onSubmit={submitform}>
                            <h3>First name</h3>
                            <input type="text" onChange={valuechange} value={signupinfo.firstname} name='firstname' placeholder="First name" required />

                            <h3>Last name</h3>
                            <input type="text" onChange={valuechange} value={signupinfo.lastname} name='lastname' placeholder="Last name" required />

                            <h3>Email</h3>
                            <input type="email" onChange={valuechange} value={signupinfo.email} name='email' placeholder="Email" required />

                            <h3>Password</h3>
                            <input type="password" onChange={valuechange} value={signupinfo.password} name='password' placeholder="Password" required />

                            <div style={{ display: "flex" }}>
                                <label htmlFor="gender" style={{ display: "flex", width: "75px" }}>
                                    Male:  <input className='inputradiobtns' style={{ marginTop: "-3px" }} type="radio" onChange={valuechange} name="gender" value="male" />
                                </label>
                                <label htmlFor="gender" style={{ display: "flex" }}>
                                    Female: <input className='inputradiobtns' required style={{ marginTop: "-3px" }} type="radio" onChange={valuechange} name="gender" value="female" />
                                </label>
                            </div>

                            <h3>ProfilePic</h3>
                            <input type="file" onChange={fileChange} name='avatar' required />

                            <input className="submit" type="submit" value="Sign up" />
                            <h4 required style={{ marginRight: "75px", textAlign: 'center' }}>
                                Have account? <NavLink to='/login'>Login</NavLink>
                            </h4>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;