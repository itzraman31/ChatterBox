import { Scrollbars } from 'react-custom-scrollbars'
import Sidebar from './Sidebar'

const LandingTwo = () => {

  return (
    <>
      <div className='landingdiv'>
        <Sidebar />

        <Scrollbars>
          <div className='rightlandingdiv' style={{ display: "flex", flexDirection: "column" }}>

            <h1 style={{ textAlign: "center", marginBottom: "18px" }}>Feeds</h1>

            <img className='postimgs' src="/images/post2.jpg" alt="" />
            <img className='postimgs' src="/images/post1.jpg" alt="" />
            <img className='postimgs' src="/images/post2.jpg" alt="" />

          </div>
        </Scrollbars>

      </div>
    </>
  )
}

export default LandingTwo
