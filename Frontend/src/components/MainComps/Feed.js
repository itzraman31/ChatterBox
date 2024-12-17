import { Scrollbars } from 'react-custom-scrollbars';
import { useContext, useEffect, useState } from 'react';
import UserMenu from '../Miscellaneous/UserMenu';
import { datatransfer } from '../../App';
import PostTemplate from '../Miscellaneous/PostTemplate';

const Feed = () => {
  const { islogin, onlineusers, userdetail } = useContext(datatransfer);
  const [user, setuser] = useState('');
  const [allusers, setallusers] = useState([]);
  const [msg, setmsg] = useState('');
  const [isfound, setisfound] = useState(true);
  const [ispostfound, setispostfound] = useState(false);
  const [allPost, setallPost] = useState([]);

  const [clicked, setclicked] = useState(false);
  const [receiver, setreceiver] = useState([])


  const onlineArr = Object.values(onlineusers);
  const online = onlineArr.includes(receiver._id);

  const searchuser = (event) => {
    setuser(event.target.value);
  };

  const fetchusers = async () => {
    const Jtoken = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5500/api/auth/searchuser?search=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${Jtoken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setallusers(data.users);
      setisfound(true);
    } else {
      setisfound(false);
      setmsg('No user found');
    }
  };

  const getid = async (e) => {

    setreceiver(e)
    setclicked(true)

    const Jtoken = localStorage.getItem("token")
    const response = await fetch(`http://localhost:5500/api/post/getAllPosts/${e._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Jtoken}`
      }
    })
    if (response.ok) {
      const data = await response.json();
      setallPost(data)
      setispostfound(true)
    }
    else {
      setispostfound(false)
      setclicked(false)
      console.log("Not found")
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

  useEffect(() => {
    if (islogin) {
      if (user.length !== 0) {
        fetchusers();
      }
      else {
        setmsg('')
        setallusers([])
      }
      if (clicked) {
        getid(userdetail._id);
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
    console.log(clicked)
  }, [user])

  useEffect(() => {
    getid(receiver);
  }, [allPost])

  return (
    <>

      <div className="landingdiv">

        <div className="lefthome" style={{ width: '350px' }}>
          <div style={{ marginLeft: '13px' }}>
            <h2 style={{ fontFamily: 'monospace', textAlign: 'center', marginTop: '10px' }}>Feed</h2>
            <div className="hellodiv">
              <img id="searchpng" src="/images/search2.png" alt="not found" />
              <input id="searchinput" type="text" onChange={searchuser} value={user} placeholder="Search" />
            </div>
            <Scrollbars style={{ height: '80vh' }}>
              {isfound ? (
                allusers?.map((e) => <UserMenu key={e._id} data={e} getid={getid} />)
              ) : (
                <h4 style={{ textAlign: 'center', marginTop: '30px' }}>{msg}</h4>
              )}
            </Scrollbars>
          </div>
        </div>

        <div className='scrollbarfeeddiv'>
          {
            clicked
              ?
              <div className='otheruserinfo'>

                <div className='otheruserinfo2'>
                  <img className='otheruserpic' src={receiver.profilepic} alt="not found" />

                  <div className='hello2'>
                    <h3>{receiver.firstname}</h3>
                    {
                      online
                        ?
                        <p className="flip-down p">online</p>
                        :
                        <></>
                    }
                  </div>
                </div>
                <div className='msgicondiv'>
                  <img className='msgicons' src="images/search2.png" alt="" />
                  <img className='msgicons' src="images/video.png" alt="" />
                  <img className='msgicons' src="images/call.png" alt="" />
                </div>
              </div>
              : <></>
          }

          {
            ispostfound ?
              <Scrollbars className='scrollbarfeed'>
                {
                  allPost?.map((post, i) => {
                    return <PostTemplate key={i} post={post} />
                  })
                }
              </Scrollbars>
              :
              <div className='MSGICONdiv'>
                <img className='MSGICON' src="/images/MANsendMSGWBG.png" alt="not found" />
                <h1 style={{ fontFamily: "cursive" }}>No Post found</h1>
              </div>
          }

        </div>

      </div>
    </>
  );
};

export default Feed;