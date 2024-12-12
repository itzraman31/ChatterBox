import React, { useContext } from 'react'
import { datatransfer } from '../../App'
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { logoutftn, islogin,userdetail } = useContext(datatransfer)
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
    const checkme=()=>{
        console.log("yes i click")
    }

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
                    {/* <NavLink to="/setting">Setting</NavLink> */}
                </div>

                {
                    islogin ?

                        <div className='header-icons1'>
                            <h2>{username1.replace(username1.charAt(0), username1.charAt(0).toUpperCase())}</h2>
                            {/* <NavLink onClick={logoutftn}  to="/">Logout</NavLink> */}

                            {/* <img id='setting_action_img1' onClick={logoutftn} title='logout' src="/images/logout.png" alt="not found" /> */}
                            <div className="dropdown">
                                <img src={userdetail.profilepic} alt="Profile" className="profile-icon"/>
                                    <ul className="dropdown-menu">
                                        <NavLink onClick={checkme} className="aa" to="/setting">Profile</NavLink>
                                        <h3 onClick={logoutftn} id='aaa' className="aa" >Logout</h3>
                                    </ul>
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
