import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash  } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import { Container, Divider, Header, Image, Segment, Icon } from 'semantic-ui-react'

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
      <Container>

      <Segment className="post-content">
        <div className="post-img">
          {post.image_url && <Image size="huge" centered rounded src={post.image_url} alt="" />}
        </div>
        <Container  textAlign="center" className="user">
          <Segment.Group size="tiny" horizontal className="info">
            <Segment >
              Written by:&nbsp;<span>{post.username}</span>
            </Segment>
          {currentUser?.username === post.username && (
            <Segment className="edit">
              <Link to={`/write?edit=${post.post_id}`} state={post}>
                <Icon name="edit" size="large" color="blue" />
              </Link>
              <Link onClick={handleDelete}>
                <Icon name="trash" size="large" color="red" />
              </Link>
            </Segment>
          )}
            <Segment>Posted {moment(post.date).fromNow()}</Segment>
          </Segment.Group>
        </Container>
          <Divider />
        <Header textAlign="center" as='h1'>{post.title}</Header>
        <Container className="body">{post.body}</Container>
      </Segment>
      </Container>
    </div>
  );
};

export default SinglePost;
