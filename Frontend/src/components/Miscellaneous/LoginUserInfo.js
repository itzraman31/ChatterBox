import React, { useState } from 'react'
import { useEffect } from 'react';

const LoginUserInfo = () => {
    const [profileuser, setprofileuser] = useState('')
    
    const getUserProfileInfo = async () => {
        const userid = localStorage.getItem("token");
        try{
          const response = await fetch(`http://localhost:5500/api/post/loginuserprofile/${userid}`, {
            method: "GET",
            headers: {
              "Authorization":`${userid}`,
              "Content-Type": "application/json",
            }
          })
          if (response.ok) {
            const data = await response.json();
            setprofileuser(data);
            console.log(data)
          }
        }
        catch(err){}
      }

      useEffect(()=>{
        getUserProfileInfo();
      },[])
    return (
        <>
        <h1>This is login user details</h1>
        </>
    )
}

export default LoginUserInfo
