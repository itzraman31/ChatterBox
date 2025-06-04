import React, { useContext, useEffect, useState } from 'react'
import { datatransfer } from '../../App'

const Userprofile = () => {
    const { isloadinginfo, profileuser, getUserProfileInfo, userdetail } = useContext(datatransfer);
    const name = profileuser ? profileuser.user.user.firstname : "guest";
    const profilepic = profileuser ? profileuser.user.user.profilepic : "";
    const [desc, setdesc] = useState('');
    const [allPost, setallPost] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [isfollow, setisfollow] = useState('');
    const [followStyle, setfollowStyle] = useState({
        backgroundColor: 'rgb(1, 1, 216)'
    })

    const getAllPosts = async () => {
        try {
            const userid = localStorage.getItem("kswd");
            if (userid !== undefined) {
                const Jtoken = localStorage.getItem("token")
                setisloading(true)
                const response = await fetch(`http://localhost:5500/api/post/getAllPosts/${userid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${Jtoken}`
                    }
                })
                setisloading(false)
                if (response.ok) {
                    const data = await response.json();
                    setallPost(data)
                }
            }
        }
        catch (err) { }
    }

    const followToUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5500/api/useraction/follow/?tofollowUser=${profileuser.user.user._id}&userId=${userdetail._id}`, {
            method: "POST",
            headers: {
                "Authorization": `${token}`
            }
        })
        if (response.ok) {
            getUserProfileInfo();
        }
    }
    const unfollowToUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5500/api/useraction/unfollow/?tounfollowUser=${profileuser.user.user._id}&userId=${userdetail._id}`, {
            method: "POST",
            headers: {
                "Authorization": `${token}`
            }
        })
        if (response.ok) {
            getUserProfileInfo();
        }
    }

    useEffect(() => {
        getUserProfileInfo();
        getAllPosts();
    }, []);

    useEffect(() => {
        if (profileuser && profileuser.user) {
            setdesc(profileuser.user.description || "No description.");
            if (profileuser.user.followers.includes(userdetail._id)) {
                setisfollow("Unfollow")
                setfollowStyle({
                    backgroundColor: "rgb(181, 182, 183)",
                    color: "black"
                })
            }
            else {
                setfollowStyle({
                    backgroundColor: "rgb(1, 1, 216)",
                    color: "white"
                })
                setisfollow("Follow")
            }
        }
    }, [profileuser, isloadinginfo]);


    return (
        <>
            <div className='userprofileoutermostdiv'>
                <div className='userinfoDiv'>
                    <img className='userprofileImg' src={profilepic} alt="User profile pic" />
                    <div className='userinfoDiv2'>
                        <h1>{profileuser ? name.replace(name.charAt(0), name.charAt(0).toUpperCase()) : "guest"}</h1>
                        <div className='postfollowdiv'>
                            <div>
                                <h3>Posts</h3>
                                <p className='textcentre'>{profileuser ? profileuser.user.posts : '0'}</p>
                            </div>
                            <div>
                                <h3>Followers</h3>
                                <p className='textcentre'>{profileuser ? profileuser.user.followers.length : '0'}</p>
                            </div>
                            <div>
                                <h3>Following</h3>
                                <p className='textcentre'>{profileuser ? profileuser.user.following.length : '0'}</p>
                            </div>
                        </div>
                        <p className='desc'>{desc}</p>
                        <div className='followMessageBtn'>
                            <button style={followStyle} onClick={!(isfollow === "Follow") ? unfollowToUser : followToUser} className='followme'>{isfollow}</button>
                            <button className='msgme'>Message</button>
                        </div>
                    </div>
                </div>
                <hr className='hruserprofile' />
                <div>
                    {
                        !isloading ?
                            <div className='postdivouter'>
                                <h1>Posts</h1>
                                {
                                    allPost.length === 0
                                        ?
                                        <h2>No post found</h2>
                                        :
                                        <div className='postdivinner'>
                                            {allPost?.map((src, i) => (
                                                <div key={i} className='image-container'>
                                                    <img
                                                        className='postImg'
                                                        src={src.images}
                                                        alt="User profile pic"
                                                    />

                                                    <div className="overlay">
                                                        <div className="icons">
                                                            <div className="icon-group">
                                                                <img src="images/like.png" alt="Likes" />
                                                                <span>{src.likes.length}</span>
                                                            </div>
                                                            <div className="icon-group">
                                                                <img src="images/comment.png" alt="Comments" />
                                                                <span>{src.comments.length}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                }
                            </div>
                            :
                            <div className='postdivouter'>
                                <h1>Posts</h1>
                                <img src="gif.gif" alt="loading" />
                            </div>
                    }
                </div>

            </div>
        </>
    )
}

export default Userprofile
