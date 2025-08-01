import React, { useContext, useEffect, useState } from 'react';
import { datatransfer } from '../../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordUpdate = () => {
    const navigate = useNavigate();
    const { userdetail, logoutftnlite, islogin } = useContext(datatransfer);

    const [signupinfo, setsignupinfo] = useState({
        oldpass: "",
        newpass: "",
        confirmpass: ""
    });

    const goback = () => {
        navigate('/setting');
    };

    const valuechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setsignupinfo({
            ...signupinfo,
            [name]: value
        });
    };

    const submitform = async (event) => {
        if (signupinfo.newpass !== signupinfo.confirmpass) {
            toast.error(`Confirm password doesn't match`, {
                position: "bottom-center",
                autoClose: 3000
            });
            event.preventDefault();
        } else {
            event.preventDefault();
            const response = await fetch(`http://localhost:5500/api/auth/passwordupdate/?id=${userdetail._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupinfo)
            });
            if (response.ok) {
                navigate('/');

                setTimeout(() => {
                    toast.success(`Password changed, Login again`, {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                }, 500);

                setsignupinfo({
                    oldpass: "",
                    newpass: "",
                    confirmpass: ""
                });
                logoutftnlite();
            } else {
                toast.error(`Invalid old password`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        }
    };

    useEffect(() => {
        if (!islogin) {
            navigate('/');
        }
    }, [islogin, navigate]);

    return (
        <>
            <div className="password-update-container">
                <div className="form-container">
                    <h3 className="page-title">Change Password</h3>

                    <form className="password-update-form" onSubmit={submitform}>
                        <label className="input-label">Old password</label>
                        <input
                            type="password"
                            className="password-input"
                            onChange={valuechange}
                            value={signupinfo.oldpass}
                            name="oldpass"
                            placeholder="Old password"
                            required
                        />

                        <label className="input-label">New password</label>
                        <input
                            type="password"
                            className="password-input"
                            onChange={valuechange}
                            value={signupinfo.newpass}
                            name="newpass"
                            placeholder="New password"
                            required
                        />

                        <label className="input-label">Confirm password</label>
                        <input
                            type="password"
                            className="password-input"
                            onChange={valuechange}
                            value={signupinfo.confirmpass}
                            name="confirmpass"
                            placeholder="Confirm password"
                            required
                        />

                        <input className="submit-btn" type="submit" value="Change Password" />

                        <button className="backbtn" onClick={goback}>Back</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PasswordUpdate;
