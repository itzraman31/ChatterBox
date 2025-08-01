import TwoFA from '../Miscellaneous/TwoFA.js'
import BackupMail from '../Miscellaneous/BackupMail.js'
import PrivateAccount from '../Miscellaneous/PrivateAccount.js'

const Privacy = () => {
  return (
    <>
    <div className='privacyOuterdiv'>
     <TwoFA/>
     <BackupMail/>
     <PrivateAccount/>
    </div>
    </>
  )
}

export default Privacy
