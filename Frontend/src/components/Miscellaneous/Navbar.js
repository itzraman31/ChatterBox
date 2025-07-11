import React, { useContext, useEffect, useState } from 'react'
import { datatransfer, socket } from '../../App'
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logoutftn, islogin, userdetail } = useContext(datatransfer)
    const [notCount,setnotCount]=useState(0);
    const [AllNotifications,setAllNotifications]=useState('');

    const navigate = useNavigate();

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

    const getAllNotifications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5500/api/notification/getallnotifications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                }
            })
            
            if (response.ok) {
                const data = await response.json();
                setnotCount(data.data.length);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        socket.on("sendNotification", (data) => {
            setnotCount(data.data.length);
        })
        return () => { socket.off("newMessage") };
    }, [])

    useEffect(() => {
        getAllNotifications();
    },[])
    
    useEffect(() => {
    },[notCount])


    return (
        <>
            <div className='outerdiv'>

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

                            <div className="dropdown">
                                <img src={userdetail.profilepic} alt="Profile" className="profile-icon" />
                                <ul className="dropdown-menu">
                                    <NavLink className="aa" to="/loginUserDetails">Profile</NavLink>
                                    <NavLink className="aa" to="/setting">Setting</NavLink>
                                    <h3 onClick={logoutftn} id='aaa' className="aa" >Logout</h3>
                                </ul>
                            </div>

                            <div className='notificationdiv'>
                                <img className='notificationimg' src="/images/notification.png" alt="Notification" />
                                {notCount!==0 && <p>{notCount}</p>}
                            </div>

                        </div>

                        :

                        <div className='header-icons'>
                            <NavLink to="/login">Login</NavLink>
                            <button onClick={register} id='Get'>Getting Started</button>
                        </div>
                }

            </div>
        </>
    )
}

export default Navbar
