import React from 'react'
import { Typewriter, Cursor } from 'react-simple-typewriter'

const Landing = () => {
    const typewriter = Typewriter({
        words: ['The digital playground for curious minds', 'The heartbeat of every conversation', 'is your canvas—paint it with your words'],
        loop: Infinity,
        typeSpeed: '110',
        delaySpeed: '900',
        deleteSpeed: '100'
    })

    return (
        <>
            <div className='kch'>
                <div className='left'>

                    <div>
                        <h1 style={{ color: 'rgb(235, 144, 135)' }}>

                            Chatterbox:
                        </h1>
                        <h3 style={{ color: "rgba(223, 191, 131, 0.89)" }}>{typewriter}
                            <span><Cursor /></span>
                        </h3>

                        <p>Join ChatterBox to connect with friends, share your thoughts, and stay updated with the latest trends.
                            Dive into conversations that matter and discover what's buzzing right now!</p>
                        <input type="email" name="email" id="email" placeholder='Email Address' />
                        <button className='btnn'>Subscribe</button>
                    </div>
                </div>
                <div className='right'>
                    <img src="./images/chatterbox.jpg" alt="" id='img1' />
                </div>
            </div>
        </>
    )
}

export default Landing
