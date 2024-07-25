import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../components/HeroSection";
import FeaturedListings from "../components/FeaturedListings";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import FeaturedAgents from "../components/FeaturedAgents";
import BlogSection from "../components/BlogSection";

const Home = () => {
  return (
    <div>
      <ToastContainer />
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
