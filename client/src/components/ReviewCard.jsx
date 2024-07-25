import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete, MdEdit } from "react-icons/md";

const ReviewCard = ({ review }) => {
  const state = useSelector((state) => state.user.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [editedRating, setEditedRating] = useState(review.rating);

  const handleEdit = async () => {
    try {
      const updatedReview = { comment: editedComment, rating: editedRating };
      await axios.put(`/reviews/${review._id}`, updatedReview);
      toast.success("Review updated successfully.");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update review.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/reviews/${review._id}`);
      toast.success("Review deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-bold text-gold">{review.user.name}</div>
        <div className="flex items-center">
          {[...Array(5)].map((star, i) => (
            <FaStar
              key={i}
              className={`inline mr-1 ${
                i < review.rating ? "text-gold" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {isEditing ? (
        <>
          <textarea
            className="w-full p-2 border rounded mb-2"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <div className="flex items-center mb-4">
            {[...Array(5)].map((star, i) => (
              <FaStar
                key={i}
                className={`inline mr-1 cursor-pointer ${
                  i < editedRating ? "text-gold" : "text-gray-300"
                }`}
                onClick={() => setEditedRating(i + 1)}
              />
            ))}
          </div>
          <button
            className="bg-gold text-white px-4 py-2 rounded mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="text-lg">{review.comment}</p>
          <p className="text-sm text-gray mt-4">
            Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
          </p>
          {state._id === review.user._id && (
            <div className="mt-4">
              <button
                className="bg-gold text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsEditing(true)}
              >
                <MdEdit />
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                <MdDelete />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewCard;
