import React, { useContext, useEffect, useState } from 'react'
import { datatransfer } from '../../App'

const Userprofile = () => {
    const { profileuser,getUserProfileInfo,profileuserid } = useContext(datatransfer);
    const name=profileuser?profileuser.user.user.firstname:"guest";
    const profilepic=profileuser?profileuser.user.user.profilepic:"";
    const [desc,setdesc]=useState('');

    useEffect(() => {
        console.log(profileuserid)
        if(profileuser.length===0){
            getUserProfileInfo();
        }
        else{
            if(profileuser.user.description===null){
                setdesc("No description.");
            }
            else{
                setdesc(profileuser.user.description);
            }
        }
        getUserProfileInfo();
    }, [])

    useEffect(()=>{
    },[desc,profileuser,profileuserid])

    return (
        <>
            <div className='userprofileoutermostdiv'>
                <div className='userinfoDiv'>
                    <img className='userprofileImg' src={profilepic} alt="User profile pic" />
                    <div className='userinfoDiv2'>
                        <h1>{profileuser?name.replace(name.charAt(0), name.charAt(0).toUpperCase()):"guest"}</h1>
                        <div className='postfollowdiv'>
                            <div>
                                <h3>Posts</h3>
                                <p>{profileuser?profileuser.user.posts:'2'}</p>
                            </div>
                            <div>
                                <h3>Followers</h3>
                                <p>{profileuser?profileuser.user.followers:'2'}</p>
                            </div>
                            <div>
                                <h3>Following</h3>
                                <p>{profileuser?profileuser.user.following:'2'}</p>
                            </div>
                        </div>
                        <p className='desc'>{desc}</p>
                        <div className='followMessageBtn'>
                            <button className='followme'>Follow</button>
                            <button className='msgme'>Message</button>
                        </div>
                    </div>
                </div>
                <hr className='hruserprofile' />
                <div className='postdivouter'>
                    <h1>Posts</h1>
                    <div className='postdivinner'>
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />
                        <img className='postImg' src="/images/guest.png" alt="User profile pic" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Userprofile
