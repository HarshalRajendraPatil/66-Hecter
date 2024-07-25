import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFavorite } from "react-icons/md";

const Header = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const state = useSelector((state) => state.user);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      dispatch(clearUser());
      toast.success("Logout successful.");
      closeSidebar();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-navyBlue text-darkGray shadow-md py-4 px-8 relative">
      {/* <ToastContainer /> */}
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="text-gold font-bold text-2xl">
          <Link to="/" onClick={closeSidebar}>
            RealEstatePro
          </Link>
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gold focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed inset-0 bg-navyBlue z-20 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:translate-x-0 lg:static lg:flex lg:items-center lg:justify-between lg:w-auto lg:space-x-4`}
        >
          {/* Close button for sidebar */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={closeSidebar}
              className="text-gold focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 p-0 lg:flex-row lg:space-y-0 lg:space-x-4 lg:p-0 items-center">
            <Link
              to="/"
              className="block lg:inline-block text-lg text-gray hover:text-gold px-5 py-1 lg:px-4"
              onClick={closeSidebar}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block lg:inline-block text-lg text-gray hover:text-gold px-5 py-1 lg:px-4"
              onClick={closeSidebar}
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="block lg:inline-block text-lg text-gray hover:text-gold px-5 py-1 lg:px-4"
              onClick={closeSidebar}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block lg:inline-block text-lg text-gray hover:text-gold px-5 py-1 lg:px-4"
              onClick={closeSidebar}
            >
              Services
            </Link>
          </nav>
          {/* User Actions */}
          {!state.isLoggedIn ? (
            <div className="flex flex-col space-y-4 p-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:p-0 items-center">
              <Link
                to="/login"
                className="block lg:inline-block max-w-fit bg-gold text-navyBlue px-4 py-2 rounded hover:bg-darkGold"
                onClick={closeSidebar}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block lg:inline-block bg-gold max-w-fit text-navyBlue px-4 py-2 rounded hover:bg-darkGold"
                onClick={closeSidebar}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 p-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:p-0 items-center">
              <Link to="/favorites" onClick={closeSidebar}>
                <MdOutlineFavorite className="text-2xl text-white" />
              </Link>
              <Link to="/profile" onClick={closeSidebar}>
                <img
                  src={state?.userInfo?.profileImg?.url || "./users.png"}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              <p className="text-white">
                Welcome,{" "}
                <span className="font-bold">{state.userInfo.name}</span>
              </p>
              <button
                onClick={logout}
                className="block bg-gold text-navyBlue px-4 py-2 rounded hover:bg-darkGold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
