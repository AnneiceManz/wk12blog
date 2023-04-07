import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Segment, Form, Button, Header } from 'semantic-ui-react'

const Register = () => {
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const resBody = await res.json();
      if (res.status === 409) {
        setError(resBody);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  // make post request to appropriate endpoint

  return (
    <div className="register">
      <Segment color="black" inverted textAlign="center" size="massive">
      <Header>Register</Header>
      <Form size="huge" onSubmit={handleSubmit}>
        <Form.Input
          required
          type="text"
          placeholder="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <Form.Input
          required
          type="email"
          placeholder="email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <Form.Input
          required
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <Form.Input
          required
          type="url"
          placeholder="image url"
          name="profile_pic"
          value={input.profile_pic}
          onChange={handleChange}
        />
        <Button type="submit" >
          Register
        </Button>
        <p style={{ color: "red" }}>{error}</p>
        <span>
          Have an account? <Link to="/login" className="link">Login</Link>
        </span>
      </Form>
      </Segment>
    </div>
  );
};

export default Register;
