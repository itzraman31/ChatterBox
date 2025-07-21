import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { datatransfer } from '../../App';

const PrivateAccount = () => {
    const { userdetail } = useContext(datatransfer)
    const [isPrivate, setIsPrivate] = useState(false);

    const handleToggle = () => {
        setIsPrivate(prev => !prev);
    };
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
