import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../hooks/useFetch";
import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Favorites = () => {
  const { data: properties, status } = useFetch("/users/favorites");

  return (
    <div className="container mx-auto mt-14 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gold">
        Favorite Properties (
        <span className="text-navyBlue">{properties.length}</span>)
      </h1>
      {status === "loading" && <LoadingSpinner />}
      {status === "succeeded" && properties.length === 0 && (
        <p>No favorite properties found.</p>
      )}
      {status === "succeeded" && properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property) => (
            <PropertyCard data={property} key={property._id} />
          ))}
        </div>
      )}
      {status === "failed" && <p>Failed to load properties.</p>}
    </div>
  );
};

export default Favorites;
