import React, { useContext, useEffect, useState } from 'react'
import { datatransfer } from '../../App'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { logoutftn, islogin, userdetail } = useContext(datatransfer)

    const [showForm, setShowForm] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const navigate = useNavigate();
    const [ispostloading, setispostloading] = useState(false);

    const username = localStorage.getItem('username')
    var username1
    if (username === null) {
        username1 = "Guest";
    }
    else {
        username1 = username
    }
    const register = () => {
        navigate('/signup')
    }
    const checkme = () => {
        console.log("yes i click")
    }
    // const setShowForm=()=>{}
    const closeForm = () => {
        setShowForm(false);
        setPostContent('');
        setPostImage(null);
    };

    const handleImageUpload = (event) => {
        setPostImage(event.target.files[0]);
    };

    // const handlePostSubmit = async () => {
    //     const Jtoken = localStorage.getItem('token');
    //     const formData = new FormData();
    //     formData.append('content', postContent);
    //     formData.append('avatar', postImage);

    //     setispostloading(true)
    //     const response = await fetch('http://localhost:5500/api/post/create', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: `${Jtoken}`,
    //         },
    //         body: formData,
    //     });

    //     setispostloading(false)
    //     if (response.ok) {
            
    //         alert('Post created successfully!');
    //         setShowForm(false);
    //         setPostContent('');
    //         setPostImage(null);

    //     } else {
    //         alert('Failed to create post. Please try again.');
    //     }
    // };



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
            // setShowPostForm(false);
            setPostContent('');
            setPostImage(null);
            setShowForm(false);
        } else {
            toast.error('Failed to create post. Please try again.', {
                position: "bottom-center",
                autoClose: 3000
            });
        }
    };
    

    useEffect(()=>{

    },[ispostloading])


    return (
        <>
            <div className='outerdiv'>


                {showForm && (
                    <div className="post-form">
                        <button className="close-btn" onClick={closeForm}>X</button>
                        <h3>Create a Post</h3>
                        <textarea
                            name='content'
                            placeholder="Write something..."
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                        <input name='avatar' type="file" accept="image/*" onChange={handleImageUpload} />
                        <button onClick={handlePostSubmit}>Post</button>
                    </div>
                )}

                <div>
                    <img className='logo' src="/images/CB13.png" alt="not found" />
                </div>

                <div className='header-icons'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/afterlogin">Feed</NavLink>
                    <NavLink to="/message">Message</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </div>

                {
                    islogin ?

                        <div className='header-icons1'>
                            <h2>{username1.replace(username1.charAt(0), username1.charAt(0).toUpperCase())}</h2>
                            {/* <NavLink onClick={logoutftn}  to="/">Logout</NavLink> */}

                            {/* <img id='setting_action_img1' onClick={logoutftn} title='logout' src="/images/logout.png" alt="not found" /> */}
                            <div className="dropdown">
                                <img src={userdetail.profilepic} alt="Profile" className="profile-icon" />
                                <ul className="dropdown-menu">
                                    <NavLink onClick={checkme} className="aa" to="/setting">Setting</NavLink>
                                    <h3 onClick={logoutftn} id='aaa' className="aa" >Logout</h3>
                                </ul>
                            </div>

                            {/* <div className="post-image-button" onClick={() => setShowForm(true)}> */}
                            <img className='addimg' src="/images/plus.png" onClick={() => setShowForm(true)} alt="Add Post" />
                            {/* </div> */}
                        </div>

                        :

                        <div className='header-icons'>
                            <NavLink to="/login">Login</NavLink>
                            <button onClick={register} id='Get'>Getting Started</button>
                        </div>
                }



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

            </div>
        </>
    )
}

export default Navbar
