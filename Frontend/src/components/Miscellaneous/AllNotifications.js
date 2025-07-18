import React, { useEffect, useState } from 'react'
import socket from './SocketShare'

const AllNotifications = () => {
  const [AllNotifcations,setAllNotifications]=useState([]);

  useEffect(()=>{
    socket.on("Allnotifications",(data)=>{
      setAllNotifications(data);
    })
  },[])
  useEffect(()=>{

  },[AllNotifcations]);
  
  return (
    <div>
      <h1>All notifications</h1>
    </div>
  )
}

export default AllNotifications
