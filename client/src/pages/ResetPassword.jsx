import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const param = useParams();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`/auth/password-reset/${param.token}`, data);
      navigate("/login");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-[70vh] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            style={{ color: "#343A40" }}
          >
            Enter your new password
          </h2>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow-sm -space-y-px flex flex-col gap-2">
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

            <div className="underline text-[#6C757D]">
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
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
