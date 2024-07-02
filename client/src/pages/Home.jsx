import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../redux/userSlice";
import HeroSection from "../components/HeroSection";
import FeaturedListings from "../components/FeaturedListings";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import FeaturedAgents from "../components/FeaturedAgents";
import BlogSection from "../components/BlogSection";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchForLogin = async () => {
  //     try {
  //       await axios.get("/checkForLogin");
  //       dispatch(setIsLoggedIn());
  //     } catch (error) {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   };
  //   fetchForLogin();
  // }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <HeroSection />
        <FeaturedListings />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
        <FeaturedAgents />
        <BlogSection />
      </div>
    </div>
  );
};

export default Home;
