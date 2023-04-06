import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Icon, Segment } from "semantic-ui-react";

const NewPost = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [writePost, setWritePost] = useState(
    state || {
      title: "",
      post_text: "",
      image_url: "",
      posted: new Date()
    }
  );

  const handleChange = (e) => {
    setWritePost({ ...writePost, [e.target.name]: e.target.value });
  };

  const postNew = (newPost) => {
    return fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
    .then((response) => {
      return response.json()
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (postNew.post_id) {
      updatePost(writePost)
      navigate("/home")
    } else {
      postNew(writePost)
      navigate("/home")
    }
  }

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <Segment color="teal" textAlign="center" padded size="massive">
        <Form onSubmit={handleSubmit}>
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
            name="posted"
            value={writePost.posted}
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
            name="post_text"
            value={writePost.post_text}
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
