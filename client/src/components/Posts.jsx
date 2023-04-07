import React from "react";
import Post from "./Post";
import { Card, Container, Segment } from "semantic-ui-react";

const Posts = ({ posts }) => {
  return (
    <Segment padded='very'>
      <Card.Group centered itemsPerRow={3} className="posts">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </Card.Group>
    </Segment>
  );
};

export default Posts;
