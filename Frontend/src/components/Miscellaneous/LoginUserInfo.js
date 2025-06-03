import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { datatransfer } from '../../App';
import { toast } from 'react-toastify';

const LoginUserInfo = () => {
  const { userdetail } = useContext(datatransfer)
  const [profileuser, setprofileuser] = useState([])
  const [allPost, setallPost] = useState([])
  const [isclicked, setisclicked] = useState(false);
  const [profilepic, setprofilepic] = useState('')
  const [isloading, setisloading] = useState(false)
  const [editprofile, seteditprofile] = useState(false);

  const name = profileuser?.user?.user ? profileuser.user.user.firstname : "guest";
  const profilepic1 = profileuser?.user?.user ? profileuser.user.user.profilepic : "";

  const editprofileftn = () => {
    seteditprofile(true);
  }
  const cancelbtn = () => {
    seteditprofile(false);
  }
  const clickme = () => {
    setisclicked(true)
  }

  const closeme = () => {
    setisclicked(false)
  }

  const getUserProfileInfo = async () => {
    const userid = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5500/api/post/loginuserprofile/${userid}`, {
        method: "GET",
        headers: {
          "Authorization": `${userid}`,
          "Content-Type": "application/json",
        }
      })
      if (response.ok) {
        const data = await response.json();
        setprofileuser(data);
      }
    }
    catch (err) { }
  }

  const getAllPosts = async () => {
    try {
      const Jtoken = localStorage.getItem("token")
      if (userdetail._id !== undefined) {
        setisloading(true)
        const response = await fetch(`http://localhost:5500/api/post/getAllPosts/${userdetail._id}`, {
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
      else {
        getUserProfileInfo();
      }
    }
    catch (err) { }
  }

  const removeProPic = async () => {
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

  useEffect(() => {
    getUserProfileInfo();
  }, [])

  useEffect(() => {
    getAllPosts();
  }, [profileuser])

  return (
    <>
      <div className='userprofileoutermostdiv'>
        <div className='userinfoDiv'>
          <div>
            <div className='userprofileImgdiv'>
              <img className='userprofileImg1' src={profilepic1} alt="User profile pic" />
              {
                editprofile ?
                  <img onClick={clickme} className='changeimgicon' src="/images/camera.png" alt="edit icon" />
                  : <></>
              }
            </div>
            <form action="" className='updateprofilepic'>
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
          </div>
          <div className='userinfoDiv2'>
            <h1>{profileuser ? name.replace(name.charAt(0), name.charAt(0).toUpperCase()) : "guest"}</h1>
            <div className='postfollowdiv'>
              <div>
                <h3>Posts</h3>
                <p className='textcentre'>{profileuser?.user ? profileuser.user.posts : '0'}</p>
              </div>
              <div>
                <h3>Followers</h3>
                <p className='textcentre'>{profileuser?.user ? profileuser.user.followers.length : '0'}</p>
              </div>
              <div>
                <h3>Following</h3>
                <p className='textcentre'>{profileuser?.user ? profileuser.user.following.length : '0'}</p>
              </div>
            </div>
            <p className='desc'>{profileuser?.user?.description ? profileuser.user.description : "no desc"}</p>
            {
              !editprofile
                ?
                <button onClick={editprofileftn} className='editbtn'>Edit Profile</button>
                :
                <button onClick={cancelbtn} className='editbtn'>Cancel</button>
            }
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

export default LoginUserInfo
