import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
const [posts, setPosts] = useState([]);

  const location = useLocation();
  const cat = location.search;

  // make a request to backend to get posts
  const getPosts = async () => {
    try {
      const respose = await fetch(`http://localhost:8080/api/posts${cat}`);
      const posts = await respose.json();
      console.log(posts);
      posts.sort((a, b) => a.id - b.id);
      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [cat]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
};

export default Homepage;
