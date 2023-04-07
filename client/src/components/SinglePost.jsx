import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash  } from "@fortawesome/free-solid-svg-icons";

const SinglePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const post_id = location.pathname.split("/")[2];
  // console.log(postId)

  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);

  const getBlogPost = async () => {
    try {
      const respose = await fetch(`http://localhost:8080/api/posts/${post_id}`);
      const post = await respose.json();
      setPost(post);
      console.log(post);
      setPost(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBlogPost();
  }, [post_id]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}Title
          <div className="singlePostEdit">
            <FontAwesomeIcon icon={faPenToSquare} className="singlePostIcon" />
            <FontAwesomeIcon icon={faTrash} className="singlePostIcon" />
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                Safak
              </Link>
            </b>
          </span>
          <span>Posted {new Date(post.posted).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{post.post_text}</p>
      </div>
    </div>
  );
};

export default SinglePost;
