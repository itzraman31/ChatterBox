import { createContext, useEffect, useState } from "react";
import RoutingPage from "./RoutingPage";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from "./components/Miscellaneous/SocketShare.js";

const datatransfer = createContext();
const url = "http://localhost:5500/api/auth/user"
function App() {
  const [notifyChat, setnotifyChat] = useState(new Set());
  const [userdetail, setuserdetail] = useState([]);
  const [islogin, setislogin] = useState(false);
  const [onlineusers, setonlineusers] = useState([]);
  const [clickeduserinfostate, setclickeduserinfostate] = useState([])

  const setMySet = (set) => {
    setnotifyChat(set);
  }

  const storetoken = async (value) => {
    
    setislogin(true)
    await getuserdetail();
    setislogin(true)
    localStorage.setItem('token', value.token)
  }

  const logoutftn = () => {

    toast.success(`Logout successfully`, {
      position: "bottom-center",
      autoClose: 3000
    });
    setislogin(false)
    localStorage.removeItem('token')
    window.location.reload();
  }

  const logoutftnlite = () => {
    setislogin(false)
    localStorage.removeItem('token')
    window.location.reload();
  }

  const getuserdetail = async () => {
    const Jtoken = localStorage.getItem('token')
    try {
      if (Jtoken !== null) {
        setislogin(true)
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `${Jtoken}`
          }
          
        })
        if (response.ok) {
          const data = await response.json();
          setuserdetail(data)
          localStorage.setItem('username', data.firstname);
          setislogin(true)
        }
        else {
          console.log("hello")
          logoutftn();
        }
      }
      else {
        setislogin(false)
      }
    }
    catch (err) {

    }
  }

  const clickeduserinfo = (info) => {
    setclickeduserinfostate(info)
  }

  useEffect(() => {
    if (userdetail.length !== 0 && islogin && userdetail._id !== null) {
      socket.emit('userid', userdetail._id);
      socket.on('allonlineusers', (list) => {
        setonlineusers(list)
        setislogin(true);
      })
      // getuserdetail();
      return () => socket.close();
    }
    else {
      getuserdetail();
    }
    getuserdetail();
    socket.on('allonlineusers', (list) => {
      setonlineusers(list)
    })
  }, [islogin, userdetail.firstname])


  useEffect(() => {
    socket.on('allonlineusers', (list) => {
      setonlineusers(list)
    })
  }, [])

  return (
    <>
      <datatransfer.Provider value={{ notifyChat, setMySet, onlineusers, clickeduserinfostate, clickeduserinfo, storetoken, logoutftn, islogin, userdetail, getuserdetail, logoutftnlite }}>
        <ToastContainer />
        <RoutingPage />
      </datatransfer.Provider>

    </>
  );
}

export default App;

export { datatransfer, socket }