import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </div>
  );
};

export default Homepage;
