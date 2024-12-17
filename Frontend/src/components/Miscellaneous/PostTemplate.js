import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import socket from "./SocketShare";
import { datatransfer } from "../../App";

const PostTemplate = ({ post }) => {
    const { userdetail } = useContext(datatransfer)
    const [likes, setLikes] = useState(12);
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    const handleLikeToggle = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };


    const handleCommentSubmit = (e) => {

        const data = {
            _id: Date.now().toString(),
            commentedBy: userdetail._id,
            commentText: newComment,
            postId: post._id
        }
        e.preventDefault();
        socket.emit("newcomment", data);
        setNewComment("");
    };

    useEffect(()=>{
        console.log(post)
    },[])

    return (
        <>

            <div className="post-card">

                <div className="post-header">
                    <img
                        src={post.createdBy.profilepic}
                        alt="User Profile"
                        className="post-avatar"
                    />
                    <div className="post-header-info">
                        <h4>{post.createdBy.firstname}</h4>
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                <div className="post-content">
                    <p className="post-text">{post.content}</p>
                    <div className="post-image-container">
                        <img
                            src={post.images[0]}
                            alt="Post"
                            className="post-image"
                        />
                    </div>
                </div>

                <div className="post-actions">
                    <button
                        className={`like-button ${isLiked ? "liked" : ""}`}
                        onClick={handleLikeToggle}
                    >
                        {isLiked ? "❤️ Liked" : "🤍 Like"}
                    </button>
                    <p className="like-count">{likes} {likes === 1 ? "Like" : "Likes"}</p>
                </div>

                <div className="post-comments">
                    <h5>Comments ({post.comments.length})</h5>
                    <Scrollbars style={{ height: "80px" }}>
                        <ul className="comment-list">
                            {post.comments?.map((comment, i) => (
                                <li key={i} className="comment-item">
                                    {
                                        comment.commentedBy._id === userdetail._id
                                            ?
                                            <p>  <strong>{"you"}</strong>: {comment.commentText}</p>
                                            :
                                        <p> <strong>{comment.commentedBy.firstname}</strong>: {comment.commentText}</p>
                                    }

                                </li>
                            ))}
                        </ul>
                    </Scrollbars>

                    <form className="comment-form" onSubmit={handleCommentSubmit}>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="comment-input"
                        />
                        <button type="submit" className="comment-button">
                            Post
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default PostTemplate;
