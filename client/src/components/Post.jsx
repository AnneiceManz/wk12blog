import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

const Post = ({ post }) => {
  return (
    <Card color="yellow" className="post">
      <Image  fluid className="postImg" src={post.image_url} alt="" />
      <Card.Content className="postInfo">
          <span className="postCat">{post.category}</span>
        <Card.Header textAlign="center">
            {post.title}
        </Card.Header>
        <Card.Meta textAlign="center">{new Date(post.date).toDateString()}</Card.Meta>
        <Card.Description className="postDesc">{post.body}</Card.Description>
      </Card.Content>
      <Card.Content textAlign="right" extra>
          <Link to={`/posts/${post.post_id}`} className="link">Read More</Link>
      </Card.Content>
    </Card>
  );
};

export default Post;
