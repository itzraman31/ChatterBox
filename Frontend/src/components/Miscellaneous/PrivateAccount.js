import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { datatransfer } from '../../App';
import socket from "./SocketShare.js";

const PrivateAccount = () => {
    const { userdetail } = useContext(datatransfer)
    const [isPrivate, setIsPrivate] = useState(false);

    const handleToggle = () => {
        const data = {
            user: userdetail._id,
            status: !isPrivate
        }
        socket.emit("accountprivate", data);
    };

    useEffect(() => {
        console.log("Hello")
        socket.on("accountprivateResponse", (res) => {
            if (res === "true") {
                setIsPrivate(prev => !prev);
                toast.success(`Setting changed`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
            else {
                toast.error(`Some error has occured`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        });

        return () => { socket.off("accountprivateResponse") };
    }, [])

    useEffect(() => {
        if (userdetail) {
            setIsPrivate(userdetail.isaccountPrivate);
        }
    }, [])
    useEffect(() => {

    }, [isPrivate])
    return (
        <>
            <div className='twoFAouterdiv'>
                <img className='backupimg' src="/images/privateaccount.png" alt="privateaccount img" />

                <div className='privateaccountdiv'>
                    <h1>Private account</h1>
                    <div className="privacy-toggle-container">
                        <label className="privacy-label">
                            Account is {isPrivate ? 'Private' : 'Public'}
                        </label>
                        <div
                            className={`privacy-switch ${isPrivate ? 'private' : 'public'}`}
                            onClick={handleToggle}
                        >
                            <div className="privacy-toggle-circle" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PrivateAccount
