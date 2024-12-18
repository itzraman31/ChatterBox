import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import socket from "./SocketShare";
import { datatransfer } from "../../App";
import { toast } from "react-toastify";

const PostTemplate = ({ post }) => {

    const { userdetail } = useContext(datatransfer)
    const [newComment, setNewComment] = useState("");

    const handleLikeToggle = async () => {
        const data = {
            userId: userdetail._id,
            postId: post._id
        }
        socket.emit("likeCount", data);
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

    const deletepost = async () => {

        if (window.confirm("Do you realy want to delete it")) {

            const resposne = await fetch(`http://localhost:5500/api/post/deletepost/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
                }
            })
            const msg = await resposne.json();
            if (resposne.ok) {
                toast.success(`${msg.message}`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
            else {
                toast.error(`${msg.message}`, {
                    position: "bottom-center",
                    autoClose: 3000
                });
            }
        }
    }
    useEffect(() => {
        // console.log(post)
    }, [])

    return (
        <>

            <div className="post-card">

                <div className="post-header-outerdiv">
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

                    {
                        post.createdBy._id===userdetail._id?
                        <div className="dropdown">
                            <img src="images/dots.png" alt="not found" className="dots" />
                            <ul className="dropdown-menu lesstop">
                                <p onClick={deletepost} className="aa">delete</p>
                                <p id='aaa' className="aa">share</p>
                            </ul>
                        </div>:<></>
                    }
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
                        className={`like-button ${post.likes.includes(userdetail._id) ? "liked" : ""}`}
                        onClick={handleLikeToggle}
                    >
                        {post.likes.includes(userdetail._id) ? "❤️ Liked" : "🤍 Like"}
                    </button>
                    <p className="like-count">{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</p>
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
