import React from "react";
import { Link } from "react-router-dom";

// const PropertyCard = ({ data, index, media_type, isRated = true }) => {
const PropertyCard = ({ data }) => {
  return (
    <Link
      to={`/properties/${data._id}`}
      className="w-full h-[22rem] overflow-hidden rounded-lg min-w-[350px] max-w-[350px] block relative hover:scale-105 transition-all shadow-xl"
    >
      {data?.media?.images?.[0]?.url ? (
        <img src={data?.media?.images?.[0]?.url} className="h-full" />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          Image not available
        </div>
      )}

      <div className="absolute h-16 bottom-0 bg-white w-full p-2">
        <h2 className="text-ellipsis line-clamp-1 font-bold text-lg">
          {data.title}
        </h2>
        <div className="text-sm flex items-center justify-between">
          <p className="  px-1 rounded-full text-xs text-black">
            Rating: {Number(data.averageRating).toFixed(1)}
          </p>
          <p className="  px-1 rounded-full text-xs text-black">
            City: {data.location.city}
          </p>
          <p className="  px-1 rounded-full text-xs text-black">
            Build year: {data.features.yearBuilt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
