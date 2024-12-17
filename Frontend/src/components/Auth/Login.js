import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { datatransfer } from '../../App';

const url = "http://localhost:5500/api/auth/login"

const Login = () => {

  const {storetoken} =useContext(datatransfer)
  const [info,setinfo]=useState('')

  const [style, setstyle] = useState('red')

  const navigate = useNavigate();
  
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: ""
  })

  const submitform = async (event) => {
    event.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(logininfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    console.log(response)
    if (response.ok) {
      const values =await response.json();
      storetoken(values);
      setinfo("Login successfully.")
      setstyle("green")
      
      setTimeout(() => {
        toast.success(`Welcome back ${values.name}`, {
          position: "bottom-center",
          autoClose: 3000
        });
        navigate('/')
      }, 500);

    }
    else {
      toast.error(`Invalid credentials.`, {
        position: "bottom-center",
        autoClose: 3000
    });
    }
  }

  const changevalue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setlogininfo({
      ...logininfo,
      [name]: value
    })
  }

  return (
    <>
      <div className="loginouterdiv">

        <div className="logindiv">

          <div className="divgreen">
          </div>
          <div className='formdiv'>
            <h1 className="loginzara">Chatterbox - login</h1>

            <form action="" className="logininfo" onSubmit={submitform}>
              
              <h3>Email</h3>

              <input type="email" onChange={changevalue} value={logininfo.email} name='email' placeholder="Email" required />

              <h3>Password</h3>

              <input type="password" onChange={changevalue} value={logininfo.password} name='password' placeholder="Password" required />

              <input className="submit" type="submit" value="Login" />

              <h4 style={{marginRight:"65px", textAlign: "center" }}>Don't have account <NavLink to="/signup">Sign up</NavLink></h4>
              <h4 style={{marginRight:"65px",marginTop:"5px", textAlign: 'center', color: `${style}`, fontFamily: "sans-serif" }}>{info}</h4>
            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default Login