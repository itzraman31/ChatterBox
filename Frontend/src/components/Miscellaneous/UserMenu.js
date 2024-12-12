import { useContext } from "react"
import { datatransfer } from "../../App"

const UserMenu = ({ data, getid,topup }) => {
  const { onlineusers } = useContext(datatransfer);
  const onlineArr = Object.values(onlineusers);
  const online = onlineArr.includes(data._id)

  return (
    <>
      <div onClick={() => {
        getid(data, online);
      }
      } className="usermenudiv">
        <div className='usermenuimgdiv'>
          {
            online
              ?
                <img className="onlinedot" src="/images/online.png" alt="" />
              :
              <></>
          }
          <img id='usermenuimg' src={data.profilepic} alt="not found" />
        </div>
        <p id='usermenup'>{data.firstname + " " + data.lastname}</p>
        {/* <p>{topup}</p> */}
      </div>
    </>
  )
}

export default UserMenu
