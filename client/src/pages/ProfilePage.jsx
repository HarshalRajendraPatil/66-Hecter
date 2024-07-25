import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PropertyCard from "../components/PropertyCard";
import ReviewCard from "../components/ReviewCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const state = useSelector((state) => state.user.userInfo);
  const [userInfo, setUserInfo] = useState(state);
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newDetails, setNewDetails] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    phone: userInfo?.phone,
  });
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/users/${state._id}`);
        console.log(res.data);
        setUserInfo(res.data.data.user);
        setProperties(res.data.data.user.listings);
        setReviews(res.data.data.user.reviews);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetails({ ...newDetails, [name]: value });
  };

  const handleUpdateDetails = async () => {
    try {
      await axios.put(`/users`, newDetails);
      toast.success("Profile updated successfully.");
      setEditMode(false);
      setUserInfo({ ...userInfo, ...newDetails });
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePhoto(file);
  };

  const handleUploadProfilePhoto = async () => {
    const formData = new FormData();
    formData.append("profilePhoto", newProfilePhoto);

    try {
      await axios.put("/users/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile photo updated successfully.");
      const updatedUser = await axios.get(`/users/${state._id}`);
      setUserInfo(updatedUser.data.data);
    } catch (error) {
      toast.error("Failed to update profile photo.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gold">Profile</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Info */}
        <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6 static lg:sticky top-6 self-start">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-4">
              <img
                src={userInfo?.profileImg?.url || "./users.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label
                htmlFor="profilePhotoInput"
                className="absolute bottom-0 right-0 bg-gold p-2 rounded-full cursor-pointer"
              >
                <FaCamera className="text-white" />
              </label>
              <input
                type="file"
                id="profilePhotoInput"
                className="hidden"
                onChange={handleProfilePhotoChange}
              />
            </div>
            {newProfilePhoto && (
              <button
                className="bg-gold text-white px-4 py-2 rounded"
                onClick={handleUploadProfilePhoto}
              >
                Upload
              </button>
            )}
            <div className="w-full">
              <label className="block text-sm font-bold text-navyBlue mt-2">
                Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={newDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p>{userInfo?.name}</p>
              )}
              <label className="block text-sm font-bold text-navyBlue mt-2">
                Email
              </label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={newDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p>{userInfo?.email}</p>
              )}
              <label className="block text-sm font-bold text-navyBlue mt-2">
                Phone
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={newDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p>{userInfo?.phone}</p>
              )}
              <div className="mt-4">
                {editMode ? (
                  <button
                    className="bg-gold text-white px-4 py-2 rounded"
                    onClick={handleUpdateDetails}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-gold text-white px-4 py-2 rounded"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Properties and Reviews */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gold">My Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties?.length > 0 ? (
                properties.map(
                  (property, idx) =>
                    idx < 2 && (
                      <PropertyCard data={property} key={property._id} />
                    )
                )
              ) : (
                <p>No properties listed.</p>
              )}
            </div>
            <div className="flex justify-between items-center flex-wrap mt-4">
              {properties.length > 2 && (
                <div className="mt-6">
                  <Link
                    to={``}
                    className="inline-block bg-gold text-white py-2 px-4 rounded hover:bg-dark-gold"
                  >
                    See all listed properties.
                  </Link>
                </div>
              )}
              <Link
                to="/properties/new"
                className="bg-gold text-white px-4 py-2 rounded mt-4 inline-block"
              >
                List a New Property
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gold">My Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.length > 0 ? (
                reviews.map(
                  (review, idx) =>
                    idx <= 2 && <ReviewCard review={review} key={idx} />
                )
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            {reviews.length > 3 && (
              <div className="mt-6">
                <Link
                  to={``}
                  className="inline-block bg-gold text-white py-2 px-4 rounded hover:bg-dark-gold"
                >
                  See all reviews.
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
