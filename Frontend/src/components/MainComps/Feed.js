import { Scrollbars } from 'react-custom-scrollbars';
import { useContext, useEffect, useState } from 'react';
import UserMenu from '../Miscellaneous/UserMenu';
import { datatransfer } from '../../App';
import PostTemplate from '../Miscellaneous/PostTemplate';

const Feed = () => {
  const { islogin, onlineusers, userdetail } = useContext(datatransfer);
  const [user, setuser] = useState('');
  const [allusers, setallusers] = useState([]);
  const [msg, setmsg] = useState('');
  const [isfound, setisfound] = useState(true);
  const [ispostfound, setispostfound] = useState(false);
  const [allPost, setallPost] = useState([]);
  const [ispostloading, setispostloading] = useState(false)

  const [clicked, setclicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [receiver, setreceiver] = useState([])


  const onlineArr = Object.values(onlineusers);
  const online = onlineArr.includes(receiver._id);

  const searchuser = (event) => {
    setuser(event.target.value);
  };

  const fetchusers = async () => {
    const Jtoken = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5500/api/auth/searchuser?search=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${Jtoken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setallusers(data.users);
      setisfound(true);
    } else {
      setisfound(false);
      setmsg('No user found');
    }
  };

  const handleImageUpload = (event) => {
    setPostImage(event.target.files[0]);
  };

  const handlePostSubmit = async () => {
    const Jtoken = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('avatar', postImage);

    setispostloading(true)
    const response = await fetch('http://localhost:5500/api/post/create', {
      method: 'POST',
      headers: {
        Authorization: `${Jtoken}`,
      },
      body: formData,
    });

    setispostloading(true)
    if (response.ok) {
      alert('Post created successfully!');
      setShowForm(false);
      setPostContent('');
      setPostImage(null);
      
    } else {
      alert('Failed to create post. Please try again.');
    }
  };

  const getid = async (e) => {

    setreceiver(e)
    setclicked(true)

    const Jtoken = localStorage.getItem("token")
    const response = await fetch(`http://localhost:5500/api/post/getAllPosts/${e._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Jtoken}`
      }
    })
    if (response.ok) {
      const data = await response.json();
      setallPost(data)
      setispostfound(true)
    }
    else {
      setispostfound(false)
      setclicked(false)
      console.log("Not found")
    }
  }

  const fetchuserswlgn = async () => {
    const response = await fetch(`http://localhost:5500/api/auth/searchuserwlgn?search=${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const data = await response.json();
      setallusers(data)
      setisfound(true)
    }

    else {
      setisfound(false)
      setmsg("No user found")
      setallusers([])
    }

  }
  const closeForm = () => {
    setShowForm(false);
    setPostContent('');
    setPostImage(null);
  };

  useEffect(() => {
    if (islogin) {
      if (user.length !== 0) {
        fetchusers();
      }
      else {
        setmsg('')
        setallusers([])
      }
      if (clicked) {
        getid(userdetail._id);
      }
    }
    else {
      if (user.length !== 0) {
        fetchuserswlgn();
      }
      else {
        setmsg('')
        setallusers([])
      }
    }
    console.log(clicked)
  }, [user])

  useEffect(() => {
    getid(receiver);
  }, [allPost])

  return (
    <>

      <div className="landingdiv">

        <div className="post-image-button" onClick={() => setShowForm(true)}>
          <img src="/images/plus.png" alt="Add Post" />
        </div>

        {showForm && (
          <div className="post-form">
            <button className="close-btn" onClick={closeForm}>X</button>
            <h3>Create a Post</h3>
            <textarea
              name='content'
              placeholder="Write something..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <input name='avatar' type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handlePostSubmit}>Post</button>
          </div>
        )}

        <div className="lefthome" style={{ width: '350px' }}>
          <div style={{ marginLeft: '13px' }}>
            <h2 style={{ fontFamily: 'monospace', textAlign: 'center', marginTop: '10px' }}>Feed</h2>
            <div className="hellodiv">
              <img id="searchpng" src="/images/search2.png" alt="not found" />
              <input id="searchinput" type="text" onChange={searchuser} value={user} placeholder="Search" />
            </div>
            <Scrollbars style={{ height: '80vh' }}>
              {isfound ? (
                allusers?.map((e) => <UserMenu key={e._id} data={e} getid={getid} />)
              ) : (
                <h4 style={{ textAlign: 'center', marginTop: '30px' }}>{msg}</h4>
              )}
            </Scrollbars>
          </div>
        </div>



        <div className='scrollbarfeeddiv'>
          {
            clicked
              ?
              <div className='otheruserinfo'>

                <div className='otheruserinfo2'>
                  <img className='otheruserpic' src={receiver.profilepic} alt="not found" />

                  <div className='hello2'>
                    <h3>{receiver.firstname}</h3>
                    {
                      online
                        ?
                        <p className="flip-down p">online</p>
                        :
                        <></>
                    }
                  </div>
                </div>
                <div className='msgicondiv'>
                  <img className='msgicons' src="images/search2.png" alt="" />
                  <img className='msgicons' src="images/video.png" alt="" />
                  <img className='msgicons' src="images/call.png" alt="" />
                </div>
              </div>
              : <></>
            //   <div className='MSGICONdiv'>
            //   <img className='MSGICON' src="/images/MANsendMSGWBG.png" alt="not found" />
            //   <h1 style={{ fontFamily: "cursive" }}>Start Browsing..</h1>
            // </div>
          }

          {
            ispostfound ?
              <Scrollbars className='scrollbarfeed'>
                {
                  allPost?.map((post, i) => {
                    return <PostTemplate key={i} post={post} />
                  })
                }
              </Scrollbars>
              :
              <div className='MSGICONdiv'>
                <img className='MSGICON' src="/images/MANsendMSGWBG.png" alt="not found" />
                <h1 style={{ fontFamily: "cursive" }}>No Post found</h1>
              </div>
          }



          {
            ispostloading ?
              <div className='pppp'>

                <div className="post-form1">
                  <img src="football.gif" alt="Loading..." className="spinner21" />
                  <h2>Creating your post....</h2>
                </div>
              </div>
              :
              <>
              </>
          }

        </div>


      </div>
    </>
  );
};

export default Feed;