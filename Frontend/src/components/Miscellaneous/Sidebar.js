import { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { datatransfer } from '../../App'

const Sidebar = () => {

    const { userdetail, islogin, getuserdetail } = useContext(datatransfer)

    useEffect(() => {
        getuserdetail();
    }, [userdetail.firstname])

    return (
        <>

            <div className='leftlandingdiv'>

                <div className='usericondiv'>
                    <img className='usericon' src="/images/userICON.png" alt="not found" />

                    {
                        islogin ? <h3>{userdetail.firstname}</h3> : <h3>{"Guest"}</h3>
                    }

                    {
                        islogin ? <h4>{userdetail.email}</h4> : <p></p>
                    }
                </div>

                <div>

                    <ul className='pointsdiv'>
                        <div className='flex'>
                            <img className='imgs' src="/images/feedICON.png" alt="not found" />
                            <li className='li'><NavLink to="/afterlogin">Feeds</NavLink></li>
                        </div>

                        <div className='flex'>
                            <img className='imgs' src="/images/messageICON.png" alt="not found" />
                            <li className='li'><NavLink to="/message">Messages</NavLink></li>
                        </div>

                        <div className='flex'>
                            <img className='imgs' src="/images/home.png" alt="not found" />
                            <li className='li'><NavLink to="/">Home</NavLink></li>
                        </div>

                        <div className='flex'>
                            <img className='imgs' src="/images/settingICON.png" alt="not found" />
                            <li className='li'><NavLink to="/setting">Setting</NavLink></li>
                        </div>

                    </ul>

                </div>

                <img className='logoimg' src="/images/CB1.png" alt="" />

                <div style={{ marginLeft: "20px", marginTop: "-15px" }}>
                    <img className='imgsl' style={{ width: "40px", height: "40px", marginBottom: "-5px" }} src="/images/youtube.png" alt="not found" />
                    <img className='imgsl' src="/images/insta.webp" alt="not found" />
                    <img className='imgsl' src="/images/facebook.png" alt="not found" />
                </div>

            </div>

        </>
    )
}

export default Sidebar
