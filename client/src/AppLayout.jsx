import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
