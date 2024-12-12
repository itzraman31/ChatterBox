import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { datatransfer } from '../../App'
import { useNavigate } from 'react-router-dom';
const Setting = () => {
    const { logoutftn, islogin, userdetail, getuserdetail } = useContext(datatransfer)
    const navigate = useNavigate();
    const [isclicked, setisclicked] = useState(false);
    const [profilepic, setprofilepic] = useState('')
    const [isloading, setisloading] = useState(false)
    const [message, setmessage] = useState('')

    const removeProPic = async () => {
        setmessage("Wait while we removing...")
        setisloading(true)
        const response = await fetch('http://localhost:5500/api/auth/removeProfilePic', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        setisloading(false)
        setisclicked(false)
        if (response.ok) {
            setTimeout(() => {
                toast.success("Profile picture removed successfully!", {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }, 500);
        } else {
            setTimeout(() => {
                toast.success("Failed to remove profile picture", {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }, 500);
        }
    }

    const fileChange = (event) => {
        setprofilepic(event.target.files[0])
    };

    const updateProPic = async () => {

        if(profilepic.length!==0){

            setmessage("Wait while we changing...")
            
            const formData = new FormData();
            formData.append("avatar", profilepic);
            setisloading(true)
            const response = await fetch(`http://localhost:5500/api/auth/updateprofilepic/${userdetail._id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setisloading(false);
            setisclicked(false);
            
            if (response.ok) {
                setTimeout(() => {
                    toast.success("Profile picture changed successfully!", {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                }, 500);
            } else {
                setTimeout(() => {
                    toast.success("Failed to change profile picture", {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                }, 500);
            }
        }
        else{
            toast.success("Select photo first", {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };


    const loginftn = () => {
        navigate('/login')
    }

    const showtoast = () => {
        toast.error(`Login first`, {
            position: "bottom-center",
            autoClose: 3000
        });
    }
    const delbtn = () => {
        if (islogin) {
            navigate('/delete')
        }
        else {
            showtoast();
        }
    }

    const updatebtn = () => {
        if (islogin) {
            navigate('/update')
        }
        else {
            showtoast();
        }
    }

    const passchnage = () => {
        if (islogin) {
            navigate('/passwordupdate')
        }
        else {
            showtoast();
        }
    }

    const clickme = () => {
        setisclicked(true)
    }

    const closeme = () => {
        setisclicked(false)
    }

    useEffect(() => {
        getuserdetail();
    }, [isclicked])

    return (
        <>
            <div className='outsettingdiv'>
                {isloading && (
                    <div className="spinner-overlay2">
                        <img src="football.gif" alt="Loading..." className="spinner2" />
                        <h2 style={{ color: "white", marginTop: "5px" }}>{message}</h2>
                    </div>
                )}

                {
                    islogin ?
                        <div className='usermanualdiv'>

                            <img id='profilepic' src={userdetail.profilepic} alt="not found" />

                            <form action="" className='updateprofilepic'>
                                <p onClick={clickme} className='changeProfileRemove additional'>Change Photo</p>

                                {
                                    isclicked
                                        ?
                                        <div className='changeProfilediv'>
                                            <div className='divprofile'>

                                                <p onClick={removeProPic} className='changeProfileRemove' >Remove Photo</p>
                                                <div className='updatepicdiv'>
                                                    <h5>Change Photo</h5>
                                                    <input type='file' onChange={fileChange} name='avatar' className='changeProfileinput' />
                                                    <p className='changeProfileRemove' onClick={updateProPic}>Update</p>
                                                </div>
                                                <p onClick={closeme} className='changeProfileRemove'>Close</p>
                                            </div>
                                        </div> : <></>
                                }
                            </form>
                            <h2>{userdetail.firstname}</h2>
                            <h4>{userdetail.email}</h4>
                        </div>
                        :
                        <div className='usermanualdiv'>
                            <img id='profilepic' src="images/guest.png" alt="not found" />
                            <h2>Guest</h2>
                        </div>
                }
                <div className='settingdiv' >

                    {
                        islogin ? <img id='setting_action_img' onClick={logoutftn} title='logout' src="/images/logout.png" alt="not found" />
                            :
                            <img id='setting_action_img' onClick={loginftn} title='login' src="/images/login.jpeg" alt="not found" />
                    }

                    <img id='setting_action_img' onClick={updatebtn} title='edit profile' src="/images/editprofile.png" alt="not found" />
                    <img id='setting_action_img' onClick={delbtn} title='delete account' src="/images/delete.png" alt="not found" />
                    <img id='setting_action_img' onClick={passchnage} title='forgot password' src="/images/forgotpass.png" alt="not found" />

                </div>
            </div>
        </>
    )
}

export default Setting
