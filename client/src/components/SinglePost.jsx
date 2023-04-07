import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash  } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const SinglePost = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const post_id = location.pathname;

  const { currentUser } = useContext(AuthContext);

  //make a request to backend to get posts
  const getPost = async () => {
    try {
      const respose = await fetch(`http://localhost:8080/api${post_id}`);
      const post = await respose.json();
      setPost(post);
      // console.log(post);
      setPost(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [post_id]);

  const handleDelete = async () => {
    try {
      console.log("called!");
      const url = `http://localhost:8080/api${post_id}`;
      console.log(url);
      const respose = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const post = await respose.json();
      // console.log(post);
      navigate("/");
      console.log(post);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="single">
      <div className="post-content">
        <div className="post-img">
          {post.image_url && <img src={post.image_url} alt="" />}
        </div>
        <div className="user">
          <div className="info">
            <p>
              Written by:&nbsp;<span>{post.username}</span>
            </p>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.post_id}`} state={post}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
              <Link onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </Link>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p className="body">{post.body}</p>
      </div>
    </div>
  );
};

export default SinglePost;
