import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import AppLayout from "./AppLayout";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Services from "./pages/Service";
import PropertyDetails from "./pages/PropertyDetails";
import AllReviewsPage from "./pages/AllReviewsPage";

const App = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:3001/api";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:propertyId" element={<PropertyDetails />} />
          <Route
            path="/properties/:propertyId/reviews"
            element={<AllReviewsPage />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
