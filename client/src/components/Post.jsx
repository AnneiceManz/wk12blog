import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="post">
      {/* <img className="postImg" src={} alt="" /> */}
      <div className="postInfo">
        {/* <div className="postCats">
          {post.categories.map((category) => (

          <span className="postCat">{category.name}</span>
          ))}
        </div> */}
          <Link to={`/post/${post.post_id}`} className="link">
        <span className="postTitle">{post.title}</span>
          </Link>
        <hr />
        <span className="postDate">{new Date(post.posted).toDateString()}</span>
      </div>
      <p className="postDesc">{post.post_text}</p>
    </div>
  );
};

export default Post;
