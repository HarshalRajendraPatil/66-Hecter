import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import {
  BsHouseDoor,
  BsFillHouseDoorFill,
  BsFillMapFill,
} from "react-icons/bs";
import { MdOutlineBalcony } from "react-icons/md";
import { TbGardenCart } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import { GiParkBench } from "react-icons/gi";
import { TbFence } from "react-icons/tb";
import { TbToolsKitchen3 } from "react-icons/tb";
import { GiHeatHaze } from "react-icons/gi";
import { GiCooler } from "react-icons/gi";
import { GiWoodPile } from "react-icons/gi";
import { GiFireplace } from "react-icons/gi";
import { FaUntappd } from "react-icons/fa";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import SkeletonColor from "../components/Skeleton";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { data: similarPropertyData, loading: similarPropertyLoading } =
    useFetch(`/properties/similar/${propertyId}`);

  useEffect(() => {
    // Fetch property data
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${propertyId}`);
        setProperty(response.data.data.property);
      } catch (error) {
        console.error("Error fetching the property details", error);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/properties/${propertyId}`);
        setReviews(response.data.data.reviews);
      } catch (error) {
        console.error("Error fetching the property details", error);
      }
    };
    fetchProperty();
    fetchReviews();
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    type,
    status,
    views,
    transactionType,
    location,
    pricing,
    features,
    interior,
    exterior,
    additionalDetails,
    media,
    averageRating,
    contactDetails,
    legal,
  } = property;

  return (
    <div className="bg-light-beige text-dark-gray p-4 md:p-8 mt-14">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-navy">{title}</h1>
        <p className="text-lg text-gray mb-4">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {media.images &&
            media.images.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={img.url}
                  alt={`Property image ${idx}`}
                  className="object-cover w-full h-60"
                />
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">
              Property Details
            </h2>
            <ul className="list-none">
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Type: {type}
              </li>
              <li className="mb-2">
                <BsHouseDoor className="inline mr-2 text-gold" />
                Status: {status}
              </li>
              <li className="mb-2">
                <BsFillMapFill className="inline mr-2 text-gold" />
                Transaction Type: {transactionType}
              </li>
              <li className="mb-2">
                <FaEye className="inline mr-2 text-gold" />
                Views: {views}
              </li>
              <li className="mb-2">
                <FaStar className="inline mr-2 text-gold" />
                Average Rating: {averageRating}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Price:{" "}
                {pricing.price ? `${pricing.price} ${pricing.currency}` : "N/A"}
              </li>
              {transactionType === "Rent" && (
                <>
                  <li className="mb-2">
                    <BsHouseDoor className="inline mr-2 text-gold" />
                    Rent: {pricing.rent} {pricing.currency} (
                    {pricing.rentFrequency})
                  </li>
                  <li className="mb-2">
                    <BsFillMapFill className="inline mr-2 text-gold" />
                    Security Deposit: {pricing.securityDeposit}
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">Location</h2>
            <ul className="list-none">
              <li className="mb-2">
                <FiMapPin className="inline mr-2 text-gold" />
                Address: {location.address}
              </li>
              <li className="mb-2">
                <FiMapPin className="inline mr-2 text-gold" />
                City: {location.city}
              </li>
              <li className="mb-2">
                <FiMapPin className="inline mr-2 text-gold" />
                State: {location.state}
              </li>
              <li className="mb-2">
                <FiMapPin className="inline mr-2 text-gold" />
                Zip Code: {location.zipCode}
              </li>
              <li className="mb-2">
                <FiMapPin className="inline mr-2 text-gold" />
                Country: {location.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">Features</h2>
            <ul className="list-none">
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Bedrooms: {features.bedrooms}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Bathrooms: {features.bathrooms}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Living Area: {features.livingArea} sq ft
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Lot Size: {features.lotSize} sq ft
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Year Built: {features.yearBuilt}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Floors: {features.floors}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Parking Spaces: {features.parkingSpaces}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Garage: {features.garage ? "Yes" : "No"}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Basement: {features.basement ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">
              Additional Details
            </h2>
            <ul className="list-none">
              <li className="mb-2">
                <FaMoneyBillWaveAlt className="inline mr-2 text-gold" />
                Hoa fess: {additionalDetails.hoaFees || "No Fees"}
              </li>
              <li className="mb-2">
                <FaSchool className="inline mr-2 text-gold" />
                Near by School:{" "}
                {additionalDetails.schoolDistrict || "No school nearby."}
              </li>
              <li className="mb-2">
                <FaBusAlt className="inline mr-2 text-gold" />
                Public Transport:{" "}
                {additionalDetails.publicTransport ||
                  "No public transport nearby."}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Utilities:{" "}
                {additionalDetails.utilities
                  ? additionalDetails.utilities.join(", ")
                  : "No Utilites provided"}
              </li>
              <li className="mb-2">
                <BsFillHouseDoorFill className="inline mr-2 text-gold" />
                Aminities: {additionalDetails.amenities.join(", ")}
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">Exterior</h2>
            <ul className="list-none">
              <li className="mb-2">
                <MdOutlineBalcony className="inline mr-2 text-gold" />
                Balcony: {exterior.balcony ? "Yes" : "No"}
              </li>

              <li className="mb-2">
                <FaSwimmingPool className="inline mr-2 text-gold" />
                Swimming Pool: {exterior.swimmingPool ? "Yes" : "No"}
              </li>

              <li className="mb-2">
                <TbFence className="inline mr-2 text-gold" />
                Fence: {exterior?.fence ? "Yes" : "No"}
              </li>

              <li className="mb-2">
                <TbGardenCart className="inline mr-2 text-gold" />
                Garden: {exterior?.garden ? "Yes" : "No"}
              </li>

              <li className="mb-2">
                <GiParkBench className="inline mr-2 text-gold" />
                Patio: {exterior.patio ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">Interior</h2>
            <ul className="list-none">
              <li className="mb-2">
                <TbToolsKitchen3 className="inline mr-2 text-gold" />
                Kitchen: {interior.kitchen}
              </li>
              <li className="mb-2">
                <GiHeatHaze className="inline mr-2 text-gold" />
                Heating: {interior.heating}
              </li>
              <li className="mb-2">
                <GiCooler className="inline mr-2 text-gold" />
                Cooling: {interior.cooling}
              </li>
              <li className="mb-2">
                <GiWoodPile className="inline mr-2 text-gold" />
                Furnishing: {interior.furnishing}
              </li>
              <li className="mb-2">
                <FaUntappd className="inline mr-2 text-gold" />
                Appliances: {interior.appliances.join(", ")}
              </li>
              <li className="mb-2">
                <GiFireplace className="inline mr-2 text-gold" />
                Fireplace: {interior.fireplace ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">
              Contact Information
            </h2>
            <p className="mb-2">
              <FiPhone className="inline mr-2 text-gold" />
              {contactDetails.contactPhone}
            </p>
            <p className="mb-2">
              <FiMail className="inline mr-2 text-gold" />
              {contactDetails.contactEmail}
            </p>
            <p className="mb-2 font-bold">{contactDetails.contactName}</p>
          </div>

          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-gold mb-2">
              Legal Information
            </h2>
            <p>Zoning: {legal.zoning}</p>
            <p>Legal Description: {legal.legalDescription}</p>
            <p>Deed Restrictions: {legal.deedRestrictions}</p>
            <p>Property ID: {legal.propertyId}</p>
          </div>
        </div>

        <div className="bg-light-beige text-dark-gray p-4 md:p-8">
          <h2 className="text-3xl font-bold font-navy  mb-1">
            <span className="text-gold">Reviews</span> ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.length > 0 ? (
              reviews.map(
                (review, idx) =>
                  idx <= 2 && (
                    <div
                      key={idx}
                      className="bg-white p-6 border border-gray-200 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xl font-bold text-gold">
                          {review.user.name}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((star, i) => (
                            <FaStar
                              key={i}
                              className={`inline mr-1 ${
                                i < review.rating
                                  ? "text-gold"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-lg">{review.comment}</p>
                      <p className="text-sm text-gray mt-4">
                        Reviewed on:{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )
              )
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          {reviews.length > 3 && (
            <div className="mt-6">
              <Link
                to={`/properties/${property._id}/reviews`}
                className="inline-block bg-gold text-white py-2 px-4 rounded hover:bg-dark-gold"
              >
                See All Reviews
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gold text-dark-gray px-6 py-3 rounded-lg hover:bg-dark-gray hover:text-light-beige transition duration-300">
            Book Property
          </button>
        </div>
      </div>

      {similarPropertyLoading ? (
        <SkeletonColor />
      ) : (
        similarPropertyData.length > 0 && (
          <HorizontalScrollBar
            data={similarPropertyData}
            heading={"Similar Properties"}
          />
        )
      )}
    </div>
  );
};

export default PropertyDetails;
