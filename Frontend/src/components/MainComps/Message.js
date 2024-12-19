import React, { useContext, useEffect, useState } from 'react'
import { datatransfer } from '../../App';
import Scrollbars from 'react-custom-scrollbars';
import UserMenu from '../Miscellaneous/UserMenu.js';
import socket from '../Miscellaneous/SocketShare.js';

const Message = () => {
  const onlineusers1 = {};

  const { islogin, userdetail, onlineusers, setMySet } = useContext(datatransfer);
  const [notifyChat, setnotifyChat] = useState(new Set());
  const [notifycount, setnotifycount] = useState(0);

  const [user, setuser] = useState('');
  const [allusers, setallusers] = useState([])
  const [msg, setmsg] = useState('')
  const [isfound, setisfound] = useState(true)
  const [message, setmessage] = useState("")
  const [receiver, setreceiver] = useState([])
  const [clicked, setclicked] = useState(false);
  const [getmsg, setgetmsg] = useState([])
  const [ismsgfound, setismsgfound] = useState(false);

  const onlineArr = Object.values(onlineusers);
  const online = onlineArr.includes(receiver._id);

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
      fetchAllusers();
      setmsg("No user found")
    }
  }

  const fetchAllusers = async () => {
    const Jtoken = localStorage.getItem('token')
    const response = await fetch(`http://localhost:5500/api/auth/searchalluser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Jtoken}`
      }
    })
    if (response.ok) {
      const data = await response.json();
      setallusers(data.users)
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
      fetchAllusers();
      setisfound(false)
      setmsg("No user found")
    }

  }

  const sendmessagebtn = async () => {

    if (message.length !== 0) {

      const Jtoken = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5500/api/message/send/${receiver._id}`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${Jtoken}`
        }
      })
      getid(receiver)
      setmessage('')
    }
  }

  const getid = async (e) => {
    setreceiver(e)
    setclicked(true)

    if (notifyChat.has(e._id)) {
      setnotifycount(0);
      notifyChat.delete(e._id);
    }
    setMySet(notifyChat);

    const Jtoken = localStorage.getItem("token")
    const response = await fetch(`http://localhost:5500/api/message/get/${e._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Jtoken}`
      }
    })
    if (response.ok) {
      const data = await response.json();
      setgetmsg(data.msgonly);
      setismsgfound(true);
      setismsgfound(data.found)
    }
    else {
      // setismsgfound(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendmessagebtn();
    }
  }

  const messagechange = (e) => {
    const val = e.target.value
    setmessage(val);
  }

  useEffect(() => {

    if (islogin) {
      if (user.length !== 0) {
        fetchusers();
      }
      else {
        fetchAllusers();
        setmsg('')
        setisfound(true)
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
      setclicked(false)
    }

  }, [user, receiver, clicked, islogin, ismsgfound])

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (receiver._id !== msg.senderId) {
        setnotifycount(notifycount + 1);

        setnotifyChat((prevSet) => new Set([...prevSet, msg.senderId]));

        onlineusers1[msg.senderId] = notifycount;
        setMySet(notifyChat);
      }
      else {
        setismsgfound(true);
        setgetmsg((prev) =>{
          if(prev===undefined){
             return [msg];
            }
            else{
             return [...prev, msg];
            }
          });
      }
    });

    return () => { socket.off("newMessage") };
  }, [receiver,getmsg]);

  return (
    <>
      <div className='landingdiv'>

        <div className="lefthome">
          <div style={{ marginLeft: "13px" }}>

            <h2 style={{ fontFamily: "monospace", textAlign: "center", marginTop: "10px" }}>Chats</h2>

            <div className='hellodiv'>
              <img id='searchpng' src="/images/search2.png" alt="not found" />
              <input id='searchinput' type="text" onChange={searchuser} value={user} placeholder='Search' />
            </div>

            <Scrollbars style={{ height: "80vh" }}>
              {
                isfound ?

                  allusers.map((e) => {
                    if (notifyChat.has(e._id)) {
                      return <UserMenu topup={1} key={e._id} data={e} getid={getid} />
                    }
                    else {
                      return <UserMenu topup={0} key={e._id} data={e} getid={getid} />
                    }
                  })

                  :
                  <h4 style={{ textAlign: "center", marginTop: "30px" }}>{msg}</h4>
              }
            </Scrollbars>

          </div>
        </div>

        <div style={{ width: "79%" }}>

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
            !ismsgfound ?
            <div className='MSGICONdiv'>
                <img className='MSGICON' src="/images/MANsendMSGWBG.png" alt="not found" />
                <h1 style={{ fontFamily: "cursive" }}>Let's start conversation.</h1>
              </div>
              :
              <Scrollbars style={{ height: "75.5vh" }} >
                <div className='chat-container'>
                  {
                    getmsg?.map((e, i) => {
                      if (e !== null) {

                        const date = new Date(e.createdAt);
                        const time = date.toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        });

                        return <div key={i} className='chat-container'>
                          {
                            e.senderId === userdetail._id
                              ?
                              <div className="chatbubbledivout1">
                                <img className="chatimg" src={userdetail.profilepic} alt="" />
                                <div className="chat-bubble sent">
                                  <p>{e.message}</p>
                                  <span className="timestamp">{time}</span>
                                </div>
                              </div>
                              :
                              <div className="chatbubbledivout">
                                <img className="chatimg" src={receiver.profilepic} alt="" />
                                <div className="chat-bubble received">
                                  <p >{e.message}</p>
                                  <span className="timestamp">{time}</span>
                                </div>
                              </div>
                          }
                        </div>
                      }
                    })
                  }
                </div>

              </Scrollbars>

          }
          {
            clicked
              ?
              <div className='sendmsgdiv'>
                <input className='inp' onKeyDown={handleKeyDown} onChange={messagechange} value={message} type="text" name="msg" id="msg" placeholder='Enter your message' />
                <img className='sendiconpng' id='searchpng' onClick={sendmessagebtn} title='send' src="/images/send.png" alt="not found" />
              </div> : <></>
          }

        </div>
      </div>
    </>
  )
}
export default Message
