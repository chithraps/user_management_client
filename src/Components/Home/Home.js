import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ProfilePic from "../ProfilePic/ProfilePic";

function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
   
  if (!user || user.user === null) {
    console.log(user)
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <ProfilePic />
    </div>
  );
}

export default Home;
