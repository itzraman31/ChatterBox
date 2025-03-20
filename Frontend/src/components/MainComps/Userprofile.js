import React from 'react'

const Userprofile = () => {
    return (
        <>
            <div className='userprofileoutermostdiv'>
                <div className='userinfoDiv'>
                    <img className='userprofileImg' src="/images/guest.png" alt="User profile pic" />
                    <div className='userinfoDiv2'>
                        <h1>Xavier</h1>
                        <div className='postfollowdiv'>
                            <div>
                                <h3>Posts</h3>
                                <p>4</p>
                            </div>
                            <div>
                                <h3>Followers</h3>
                                <p>384</p>
                            </div>
                            <div>
                                <h3>Following</h3>
                                <p>6</p>
                            </div>
                        </div>
                        <p className='desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, nesciunt distinctio esse corrupti quidem debitis quia, quos voluptatibus et quas, id cumque magnam molestias. Excepturi explicabo, molestias fuga corporis iure dolore voluptatibus!</p>
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
