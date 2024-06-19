import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const state = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="bg-navyBlue text-darkGray shadow-md p-4 relative"
      style={{ backgroundColor: "#001F3F", color: "#343A40" }}
    >
      <div className="containers flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-gold font-bold text-2xl"
          style={{ color: "#FFC107" }}
        >
          <Link to="/">RealEstatePro</Link>
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gold focus:outline-none"
            style={{ color: "#FFC107" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
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

        <div
          className={`lg:flex lg:flex-row lg:top-3 lg:right-5 lg:p-0 z-10 lg:gap-[10rem] ${
            isMenuOpen
              ? "flex flex-col absolute top-[3rem] bg-navyBlue right-0 translate-x-0 gap-5 p-4"
              : "hidden"
          } items-center justify-center`}
        >
          {/* Navigation Links */}
          <nav className={`lg:flex lg:space-x-4w-full lg:w-auto`}>
            <Link
              to="/"
              className="block lg:inline-block hover:text-gold px-2 py-1 lg:px-4"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block lg:inline-block hover:text-gold px-2 py-1 lg:px-4"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="block lg:inline-block hover:text-gold px-2 py-1 lg:px-4"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block lg:inline-block hover:text-gold px-2 py-1 lg:px-4"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              Contact
            </Link>
          </nav>
          {/* User Actions */}
          <div
            className={`lg:flex lg:space-x-4 ${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto`}
          >
            <Link
              to="/login"
              className="block lg:inline-block bg-gold text-navyBlue px-4 py-2 rounded hover:bg-darkGold mb-2 lg:mb-0"
              style={{
                backgroundColor: "#FFC107",
                color: "#001F3F",
                hover: { backgroundColor: "#E0A800" },
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block lg:inline-block bg-gold text-navyBlue px-4 py-2 rounded hover:bg-darkGold"
              style={{
                backgroundColor: "#FFC107",
                color: "#001F3F",
                hover: { backgroundColor: "#E0A800" },
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
