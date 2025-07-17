import { useContext } from 'react'
import { datatransfer } from '../../App'
import { NavLink, useNavigate } from 'react-router-dom';
import ShowNotifcationCompo from './ShowNotifcationCompo';

const Navbar = () => {
    const { logoutftn, islogin, userdetail } = useContext(datatransfer)
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
                                <ShowNotifcationCompo/>
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
