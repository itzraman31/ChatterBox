import { useContext, useEffect,useState } from "react";
import { datatransfer } from "../../App";

const VideoCall = () => {
  const {userdetail}=useContext(datatransfer);
  
  const [isVideocalling,setisVideocalling]=useState(false);

  useEffect(()=>{
    console.log("Yes it video calling...")
  },[isVideocalling])

  return (
    <>
      <div>this is video call div</div>
    </>
  )
}

export default VideoCall
