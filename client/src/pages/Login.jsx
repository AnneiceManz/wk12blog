import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/authContext";

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
      // if (res.status === 404) {
      //   setError(resBody);
      //   return;
      // }
      // if (res.status === 400) {
      //   setError(resBody);
      //   return;
      // }
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn-login">
          Login
        </button>
        <p style={{ color: "red" }}>{error}</p>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;