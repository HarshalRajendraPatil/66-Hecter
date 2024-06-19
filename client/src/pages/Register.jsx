import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    passwordHash: "",
  });

  const { name, email, passwordHash, address, phone } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", formData);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <ToastContainer
        className="toast-position"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            style={{ color: "#343A40" }}
          >
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-3" onSubmit={onSubmit}>
          <div className="rounded-full shadow-sm -space-y-px flex flex-col gap-2">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                style={{ color: "#343A40" }}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                style={{ color: "#343A40" }}
              />
            </div>
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="address"
                autoComplete="address"
                required
                value={address}
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
                style={{ color: "#343A40" }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone No.
              </label>
              <input
                id="phone"
                name="phone"
                type="phone"
                autoComplete="phone"
                required
                value={phone}
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
                style={{ color: "#343A40" }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="passwordHash"
                type="password"
                autoComplete="current-password"
                required
                value={passwordHash}
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                style={{ color: "#343A40" }}
              />
            </div>
            <div className="underline">
              <Link to="/login" className="text-xs">
                Login to account
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{ backgroundColor: "#FFC107" }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
