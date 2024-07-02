import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="relative">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
