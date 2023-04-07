import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <div className="auth">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          value={input.email}
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
        <input
          required
          type="url"
          placeholder="image url"
          name="profile_pic"
          value={input.profile_pic}
          onChange={handleChange}
        />
        <button type="submit" className="btn-register">
          Register
        </button>
        <p style={{ color: "red" }}>{error}</p>
        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
