import React, { useContext, useState } from 'react'
import { datatransfer } from '../../App'

const FriendRequestMenu = (props) => {
    const { clickeduserinfostate } = useContext(datatransfer)
    const [isfriend, setisfreind] = useState(false);

    return (
        <>
            <div className='sendreqdiv1'>
                <img onClick={props.sendreqcorssbtn} className='sendreqcorssimg' src="images/crossWB.png" alt="" />
                <div className='sendreqdiv2'>
                    <img src={clickeduserinfostate.profilepic} className='sendreqimg' alt="user's dp not found" />
                    <h3>{clickeduserinfostate.firstname}</h3>
                    <div>
                        {
                             ! isfriend ?
                                <button className='sendreqbtn'>Follow</button>
                                :
                                <div>
                                     <button className='sendreqbtn'>unfollow</button>
                                     <button className='sendreqbtn'>Message</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendRequestMenu
