import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { datatransfer } from '../../App'
import { NavLink, useNavigate } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import PostTemplate from '../Miscellaneous/PostTemplate';

const Setting = () => {
    const { logoutftn, islogin, userdetail, getuserdetail, allPost, getAllPosts } = useContext(datatransfer)
    const navigate = useNavigate();
    const [isclicked, setisclicked] = useState(false);
    const [profilepic, setprofilepic] = useState('')
    const [isloading, setisloading] = useState(false)
    const [message, setmessage] = useState('')

    const [ispostloading, setispostloading] = useState(false)

    const [showPostForm, setShowPostForm] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);

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
                toast.error("Failed to remove profile picture", {
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
        if (profilepic.length !== 0) {
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
                setprofilepic('')
                setTimeout(() => {
                    toast.success("Profile picture changed successfully!", {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                }, 500);
            } else {
                setprofilepic('')
                setTimeout(() => {
                    toast.error("Failed to change profile picture", {
                        position: "bottom-center",
                        autoClose: 3000
                    });
                }, 500);
            }
        } else {
            toast.error("Select photo first", {
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
        } else {
            showtoast();
        }
    }

    const updatebtn = () => {
        if (islogin) {
            navigate('/update')
        } else {
            showtoast();
        }
    }

    const passchnage = () => {
        if (islogin) {
            navigate('/passwordupdate')
        } else {
            showtoast();
        }
    }

    const clickme = () => {
        setisclicked(true)
    }

    const closeme = () => {
        setisclicked(false)
    }

    const handlePostSubmit = async () => {
        const Jtoken = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('content', postContent);
        formData.append('avatar', postImage);
        setispostloading(true)
        const response = await fetch('http://localhost:5500/api/post/create', {
            method: 'POST',
            headers: {
                Authorization: `${Jtoken}`,
            },
            body: formData,
        });
        setispostloading(false)

        if (response.ok) {
            toast.success('Post created successfully!', {
                position: "bottom-center",
                autoClose: 3000
            });
            console.log("Post created")
            setShowPostForm(false);
            setPostContent('');
            setPostImage(null);
        } else {
            toast.error('Failed to create post, Please try again', {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };
    useEffect(() => {
        getuserdetail()
    }, [isclicked])

    useEffect(() => {
        console.log("hello")
        getAllPosts(userdetail)
    }, [allPost])


    return (
        <>
            <div className='sliderouterdiv'>
                <div className="sidebar">
                    <div className="sidebar-content">
                        <h3>Setting</h3>

                        <div className='settingdiv'>
                            {
                                islogin ?
                                    <img id='setting_action_img' title='create post' onClick={() => setShowPostForm(true)} src="/images/plus.png" alt="Add Post" />
                                    : <></>
                            }
                            <img id='setting_action_img' onClick={updatebtn} title='edit profile' src="/images/edit1.png" alt="not found" />
                            <img id='setting_action_img' onClick={passchnage} title='forgot password' src="/images/forgotpass.png" alt="not found" />
                            {
                                islogin ? <img id='setting_action_img' onClick={logoutftn} title='logout' src="/images/logout.png" alt="not found" />
                                    :
                                    <img id='setting_action_img' onClick={loginftn} title='login' src="/images/login.jpeg" alt="not found" />
                            }

                            <img id='setting_action_img' onClick={delbtn} title='delete account' src="/images/delete.png" alt="not found" />
                            <NavLink to="/privacy">Privacy & Security</NavLink>
                        </div>
                    </div>
                </div>

                <div className='outsettingdiv'>

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

                    {
                        allPost.length === 0 ?

                            <div className='checklogin'>
                                {
                                    islogin ? <div className='postnotfoundgif'>
                                        <img className='MSGICON' src="/images/MANsendMSGWBG.png" alt="not found" />
                                        <h1 style={{ fontFamily: "cursive" }}>No Post found</h1>
                                    </div> :
                                     <h1>Login to your account</h1>
                                }

                            </div>
                            :
                            <div className='settingpostdisplaydiv'>
                                <h1>All post</h1>

                                <Scrollbars style={{ height: "500px" }}>
                                    {
                                        allPost?.map((post, i) => {
                                            return <PostTemplate key={i} post={post} />
                                        })
                                    }
                                </Scrollbars>
                            </div>}


                    {showPostForm && (
                        <div className="post-form">
                            <button className="close-btn" onClick={() => setShowPostForm(false)}>X</button>
                            <h3>Create a Post</h3>
                            <textarea
                                name='content'
                                placeholder="Write something..."
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            <input name='avatar' type="file" accept="image/*" onChange={(e) => setPostImage(e.target.files[0])} />
                            <button onClick={handlePostSubmit}>Post</button>
                        </div>
                    )}

                    {
                        ispostloading ?
                            <div className='pppp'>

                                <div className="post-form1">
                                    <img src="football.gif" alt="Loading..." className="spinner21" />
                                    <h2>Creating your post....</h2>
                                </div>
                            </div>
                            :
                            <>
                            </>
                    }


                    {
                        isloading ?
                            <div className='pppp'>

                                <div className="post-form1">
                                    <img src="football.gif" alt="Loading..." className="spinner21" />
                                    <h2>{message}</h2>
                                </div>
                            </div>
                            :
                            <>
                            </>
                    }

                </div>
            </div>
        </>
    )
}

export default Setting;

