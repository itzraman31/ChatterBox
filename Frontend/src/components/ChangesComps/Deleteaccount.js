import React, { useContext, useState, useEffect } from 'react'
import { datatransfer } from '../../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:5500/api/auth/delete"

const Deleteaccount = () => {
  const { logoutftnlite, userdetail, islogin } = useContext(datatransfer)
  const navigate = useNavigate()

  const [logininfo, setlogininfo] = useState({
    email: "",
    password: ""
  })

  const goback = () => {
    navigate('/setting')
  }

  const submitform = async (event) => {
    event.preventDefault();
    const Jtoken = localStorage.getItem('token')

    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(logininfo),
      headers: {
        "Authorization": `${Jtoken}`,
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      navigate('/')
      setTimeout(() => {
        toast.success(`User delete sucessfully`, {
          position: "bottom-center",
          autoClose: 3000
        });
      });
      logoutftnlite();
    }
    else {
      // navigate('/')
        toast.error(`Invalid details`, {
          position: "bottom-center",
          autoClose: 3000
        });
    }
  }

  const changevalue = (event) => {


    let name = event.target.name;

    let value = event.target.value;

    setlogininfo({
      email: userdetail.email,
      [name]: value,

    })
  }

  useEffect(()=>{
    if(!islogin)
      {
        navigate('/')
      }
  },[islogin])

  return (
    <>
      <div className='deldiv'>
        <div className='deldiv2'>
          <h2 className='headingdl' style={{ textAlign: "center" }}>Delete Account</h2>

          <div>
            <form action="" className='delform' onSubmit={submitform}>

              <h3>Email</h3>

              <input type="email" className='delinput' value={userdetail.email} placeholder="Email" required />

              <h3>Password</h3>

              <input type="password" className='delinput' onChange={changevalue} name='password' placeholder="Password" required />

              <input className='delbtn' type="submit" value="Delete" />

            </form>
          </div>
          <button className='backbtn' onClick={goback}>Back</button>
        </div>
      </div>
    </>
  )
}

export default Deleteaccount
