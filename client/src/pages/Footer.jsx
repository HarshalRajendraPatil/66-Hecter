import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-navyBlue text-lightBeige py-8"
      style={{ backgroundColor: "#001F3F", color: "#F8F9FA" }}
    >
      <div className="container mx-auto text-center grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Company Information */}
        <div>
          <h2
            className="font-bold text-xl text-gold mb-4"
            style={{ color: "#FFC107" }}
          >
            RealEstatePro
          </h2>
          <p className="mb-2">123 Main Street</p>
          <p className="mb-2">City, State, ZIP</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: info@realestatepro.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link
                to="/"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/about"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/properties"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                Properties
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/contact"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/faq"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                FAQs
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/privacy-policy"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                Privacy Policy
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/terms-of-service"
                className="hover:text-gold"
                style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4 md:flex-col  gap-3 items-center justify-center">
            <a
              href="https://facebook.com"
              className="hover:text-gold text-[1.5rem]"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              {<FaFacebookF />}
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-gold text-[1.5rem]"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              {<BsTwitterX />}
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-gold text-[1.5rem]"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              {<GrInstagram />}
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-gold text-[1.5rem]"
              style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
            >
              {<FaLinkedinIn />}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} RealEstatePro. All rights reserved.
        </p>
        <p className="mt-2">
          <Link
            to="/terms-of-service"
            className="hover:text-gold"
            style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
          >
            Terms of Service
          </Link>{" "}
          |{" "}
          <Link
            to="/privacy-policy"
            className="hover:text-gold"
            style={{ color: "#6C757D", hover: { color: "#FFC107" } }}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
