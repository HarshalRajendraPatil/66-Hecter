import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const err = formState.errors;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);
      dispatch(setUser(res.data.user));
      navigate("/");
      toast.success("Login successful.");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-[70vh] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="max-w-md w-full space-y-6">
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
          <h2
            className="text-center text-3xl font-extrabold text-gray-900"
            style={{ color: "#343A40" }}
          >
            Login to your Account
          </h2>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-full shadow-sm -space-y-px flex flex-col gap-2">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                style={{ color: "#343A40" }}
              />
            </div>

            <div>
              <label htmlFor="passwordHash" className="sr-only">
                Password
              </label>
              <input
                id="passwordHash"
                type="password"
                {...register("passwordHash")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                style={{ color: "#343A40" }}
              />
            </div>

            <div className="flex justify-between underline text-[#6C757D]">
              <Link to="/register" className="text-xs">
                Create an Account?
              </Link>
              <Link to="/forgot-password" className="text-xs">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{ backgroundColor: "#FFC107" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
