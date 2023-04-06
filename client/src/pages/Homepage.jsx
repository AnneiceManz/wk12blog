import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  const location = useLocation();
  console.log(location);

  const [blogPosts, setBlogPosts] = useState([]);


  const loadBlogPosts = () => {
      // A function to fetch the list of students that will be load anytime that list change
      fetch("http://localhost:8080/api/posts")
          .then((response) => response.json())
          .then((blogPosts) => {
              setBlogPosts(blogPosts);
          });
  }

  useEffect(() => {
      loadBlogPosts();
  }, [blogPosts]);

  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={blogPosts} />
        <Sidebar />
      </div>
    </div>
  );
};

export default Homepage;
