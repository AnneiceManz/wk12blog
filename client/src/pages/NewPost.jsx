import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Icon, Segment } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const state = useLocation().state;
  const userid = currentUser.user_id
  // console.log("state", state);
  const [writePost, setWritePost] = useState(
    state || {
      user_id: userid,
      title: "",
      body: "",
      image_url: "",
      category: "",
      date: new Date(),
    }
  );
  // console.log(writePost.user_id)
  // console.log(inputs);
  const handleChange = (e) => {
    // console.log("is checked", e.target.checked);
    // console.log(e.target.name);
    // console.log(e.target.value);
    setWritePost({ ...writePost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state) {
        const response = await fetch(
          `http://localhost:8080/api/posts/${state.post_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(writePost),
          }
        );
        const updated = await response.json();
        // console.log(updated);
        navigate("/");
      } else {
        const response = await fetch(`http://localhost:8080/api/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(writePost),
        });
        const updated = await response.json();
        // console.log(updated);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const navigate = useNavigate();
  // const state = useLocation().state;
  // // console.log("state", state);
  // const [writePost, setWritePost] = useState(
  //   state || {
  //     title: "",
  //     body: "",
  //     image_url: "",
  //     category: "",
  //     date: new Date (),
  //   }
  // );
  // // console.log(inputs);
  // const handleChange = (e) => {
  //   setWritePost({ ...writePost, [e.target.name]: e.target.value });
  // };

  // const postNew = (newPost) => {
  //   return fetch("http://localhost:8080/api/posts", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify(newPost)
  //   })
  //   .then((response) => {
  //     return response.json()
  //   })
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (postNew.post_id) {
  //     updatePost(writePost)
  //     navigate("/")
  //   } else {
  //     postNew(writePost)
  //     navigate("/")
  //   }
  // }

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <Segment color="teal" textAlign="center" padded size="massive">
        <Form onSubmit={handleSubmit}>
          <Form.Input
          disabled 
          transparent
          width={1}
          type="number"
          size="mini"
          name="user_id"
          value={userid}
          onChange={handleChange}
          />
          <Form.Group widths="equal">
            <Form.Input 
            iconPosition="left" 
            label="Image URL" 
            type="url" width={4} 
            name="image_url"
            value={writePost.image_url}
            onChange={handleChange}
            required
            >
              <Icon size="large" color="teal" name="file image outline" />
              <input />
            </Form.Input>
            <Form.Input  
            label="Title" 
            type="text" width={8} 
            name="title"
            value={writePost.title}
            onChange={handleChange}
            required
            />
            <Form.Input 
            width={2}
            type="date"
            label="Post Date"
            name="date"
            value={writePost.date}
            onChange={handleChange}
            required
            />
            <Form.Input 
            width={2}
            type="text"
            label="Category"
            name="category"
            value={writePost.category}
            onChange={handleChange}
            required
            />
          </Form.Group>
          <Form.TextArea
          width={16}
            placeholder="Tell your story..."
            label="Post"
            type="text"
            rows={16}
            name="body"
            value={writePost.body}
            onChange={handleChange}
            required
          />
          <Button color="teal" type="submit">
            Publish
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

export default NewPost;
