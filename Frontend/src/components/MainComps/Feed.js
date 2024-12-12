import { Scrollbars } from 'react-custom-scrollbars'
import Navbar from '../Miscellaneous/Navbar'
import { useContext, useEffect, useState } from 'react'
import UserMenu from '../Miscellaneous/UserMenu';
import { datatransfer } from '../../App';
import FriendRequestMenu from '../Miscellaneous/FriendRequestMenu';

const Feed = () => {
  const { islogin, clickeduserinfo } = useContext(datatransfer);
  const [user, setuser] = useState('');
  const [allusers, setallusers] = useState([])
  const [msg, setmsg] = useState('')
  const [isfound, setisfound] = useState(true)

  const [clicked, setclicked] = useState(false);

  const searchuser = (event) => {
    setuser(event.target.value)
  }

  const fetchusers = async () => {
    const Jtoken = localStorage.getItem('token')
    const response = await fetch(`http://localhost:5500/api/auth/searchuser?search=${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Jtoken}`
      }
    })
    if (response.ok) {
      const data = await response.json();
      setallusers(data.users)
      setisfound(true)
    }
    else {
      setisfound(false)
      setmsg("No user found")
    }
  }

  const fetchuserswlgn = async () => {
    const response = await fetch(`http://localhost:5500/api/auth/searchuserwlgn?search=${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const data = await response.json();
      setallusers(data)
      setisfound(true)
    }

    else {
      setisfound(false)
      setmsg("No user found")
      setallusers([])
    }

  }

  const getid = async (e) => {
    clickeduserinfo(e);
    setclicked(true)
    const Jtoken = localStorage.getItem("token")
    const response = await fetch(`http://localhost:5500/api/message/get/${e._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Jtoken}`
      }
    })
    if (!response.ok) {
      setclicked(false);
    }
  }
  const sendreqcorssbtn = () => {
    setclicked(false)
  }

  useEffect(() => {
    if (islogin) {
      if (user.length !== 0) {
        fetchusers();
      }
      else {
        setmsg('')
        setallusers([])
      }
    }
    else {
      if (user.length !== 0) {
        fetchuserswlgn();
      }
      else {
        setmsg('')
        setallusers([])
      }
    }
  }, [user])

  return (
    <>
      {/* <Navbar /> */}
      <div className='landingdiv'>

        <div className="lefthome" style={{ width: "350px" }} >
          <div style={{ marginLeft: "13px" }}  >

            <h2 style={{fontFamily:"monospace" ,textAlign:"center",marginTop:"10px"}}>Feed</h2>
            <div className='hellodiv'>
              <img id='searchpng' src="/images/search2.png" alt="not found" />
              <input id='searchinput' type="text" onChange={searchuser} value={user} placeholder='Search' />
            </div>

            <Scrollbars style={{ height: "80vh" }}>

              {
                isfound ?
                  allusers?.map((e) => {
                    return <UserMenu key={e._id} data={e} getid={getid} />
                  }) :
                  <h4 style={{ textAlign: "center", marginTop: "30px" }}>{msg}</h4>
              }

            </Scrollbars>

          </div>
        </div>

        {
          clicked
            ?
            <FriendRequestMenu sendreqcorssbtn={sendreqcorssbtn} />
            :
            <Scrollbars>

              <div className='rightlandingdiv'>

                <img className='postimgs' src="/images/post2.jpg" alt="" />
                <img className='postimgs' src="/images/post1.jpg" alt="" />
                <img className='postimgs' src="/images/post2.jpg" alt="" />

              </div>
            </Scrollbars>
        }
      </div>
    </>
  )
}

export default Feed
