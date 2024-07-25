import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdDelete,
  MdEdit,
} from "react-icons/md";

const PropertyCard = ({ data }) => {
  const state = useSelector((state) => state.user.userInfo);
  const [isFav, setIsFav] = useState(
    state?.favorites ? state?.favorites?.includes(data._id) : false
  );
  const isPropertyOwnedByUser = data?.listingDetails?.listedBy === state?._id;

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/properties/${data._id}/favorites`);
      {
        isFav
          ? toast.success("Removed from favorites.")
          : toast.success("Added to favorites.");
      }
      setIsFav(!isFav);
    } catch (error) {
      toast.error("Failed to update favorites.");
    }
  };

  const handleDeleteProperty = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/properties/${data._id}`);
      toast.success("Property deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete the favorites.");
    }
  };

  return (
    <div className="flex justify-center">
      <Link
        to={`/properties/${data._id}`}
        className="w-full h-[22rem] overflow-hidden rounded-lg min-w-[280px] max-w-[300px] block relative hover:scale-105 transition-all shadow-xl"
      >
        {data?.media?.images?.[0]?.url ? (
          <img
            src={data?.media?.images?.[0]?.url}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
            Image not available
          </div>
        )}
        {state?.favorites && (
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 bg-white text-red-600 p-2 rounded-full shadow-lg"
          >
            {isFav ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
          </button>
        )}
        {isPropertyOwnedByUser && (
          <>
            <button
              onClick={handleDeleteProperty}
              className="absolute top-2 right-12 bg-white text-gray p-2 rounded-full shadow-lg"
            >
              <MdDelete />
            </button>
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-2 right-[5.5rem] bg-white text-gray p-2 rounded-full shadow-lg"
            >
              <MdEdit />
            </button>
          </>
        )}
        <div className="absolute h-20 bottom-0 bg-white w-full p-2">
          <h2 className="text-ellipsis line-clamp-1 font-bold text-lg">
            {data.title}
          </h2>
          <div className="text-sm flex items-center justify-between">
            <p className="px-1 rounded-full text-xs text-black">
              Rating: {Number(data.averageRating).toFixed(1)}
            </p>
            <p className="px-1 rounded-full text-xs text-black">
              City: {data.location.city}
            </p>
            <p className="px-1 rounded-full text-xs text-black">
              Build year: {data.features.yearBuilt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
