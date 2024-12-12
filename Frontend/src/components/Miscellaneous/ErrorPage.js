import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate=useNavigate();

    const goonhome=()=>{
        navigate('/')
    }
  return (
    <>
    <div className='errordiv'>
      <h2>Oops nothing found here!!!</h2>
      <button className='gohomebtn' onClick={goonhome}>Home</button>
    </div>
    </>
  )
}

export default ErrorPage
