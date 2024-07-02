import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-12 px-3 bg-[#001F3F] text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Find Your Dream Home?
        </h2>
        <p className="mt-4 mb-6  text-lg md:text-xl">
          Sign up today and start exploring the best properties.
        </p>
        <Link
          to={"/properties"}
          className="bg-[#FFC107] text-[#001F3F] px-4 py-2 rounded-md font-bold"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
