import React, { useContext, useEffect, useState } from 'react'
import { datatransfer } from '../../App'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Updateprofile = () => {
    const navigate = useNavigate();
    const { userdetail, islogin } = useContext(datatransfer);
    const [signupinfo, setsignupinfo] = useState({
        firstname: "",
        lastname: ""
    })
    
    const goback = () => {
        navigate('/setting')
    }

    const valuechange = (event) => {
        console.log(userdetail)
        const name = event.target.name;
        const value = event.target.value;

        setsignupinfo({
            ...signupinfo,
            [name]: value
        })
    }

    const submitform = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5500/api/auth/updateprofile/?id=${userdetail._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupinfo)
        })
        if (response.ok) {
            navigate('/setting')

            setTimeout(() => {
                toast.success(`Details changed successfully`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }, 500);

            setsignupinfo({
                firstname: "",
                lastname: "",
            })
        }
    }

    useEffect(() => {
        if (!islogin) {
            navigate('/')
        }
    })

    return (
        <>
            <div className="update-profile-container">
                <div className='form-container'>
                    <h3 className="update-profile-title">Update - Profile</h3>

                    <form className="update-profile-form" onSubmit={submitform}>
                        <div className="input-group">
                            <label htmlFor="firstname" className="label">First name</label>
                            <input type="text" id="firstname" name="firstname" value={signupinfo.firstname} onChange={valuechange} placeholder="First name" className="input-field" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastname" className="label">Last name</label>
                            <input type="text" id="lastname" name="lastname" value={signupinfo.lastname} onChange={valuechange} placeholder="Last name" className="input-field" required />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="submit-btn">Update</button>
                            <button type="button" className="backbtn" onClick={goback}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Updateprofile;
