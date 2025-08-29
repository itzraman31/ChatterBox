import { useEffect,useState } from "react";

const VideoCall = () => {
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
