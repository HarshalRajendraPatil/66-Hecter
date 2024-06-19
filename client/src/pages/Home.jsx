import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    if (!state.userInfo) navigate("/login");
  }, []);

  return <div>Home</div>;
};

export default Home;
