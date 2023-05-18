import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/authContext";
import { Form, Button, Segment, Header} from 'semantic-ui-react'

const Login = () => {
  const [input, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = await login(input);
      if (error) {
        setError(error);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login">
    <Segment textAlign="center" color="black" inverted size="massive">
      <Header as='h1'>Login</Header>
      <Form  size="huge" onSubmit={handleSubmit}>
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
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <Button type="submit" color="grey">
          Login
        </Button>
        <p style={{ color: "red" }}>{error}</p>
        <span>
          Don't have an account? <Link className="link" to="/register">Register</Link>
        </span>
      </Form>
    </Segment>
    </div>
  );
};

export default Login;