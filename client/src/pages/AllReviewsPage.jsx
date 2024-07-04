import React from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const AllReviewsPage = () => {
  const { propertyId } = useParams();
  const { data: reviews, loading: reviewsLoading } = useFetch(
    `/reviews/properties/${propertyId}`
  );
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
    percentage: (
      (reviews.filter((review) => review.rating === star).length /
        totalReviews) *
      100
    ).toFixed(1),
  }));

  return reviewsLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="bg-light-beige text-dark-gray p-4 md:p-8 mt-14">
      <h2 className="text-3xl font-bold text-gold mb-1">All Reviews</h2>
      <div className="my-4">
        <h3 className="text-2xl font-semibold text-dark-gray mb-4">
          Rating Breakdown
        </h3>
        {ratingCounts.map(({ star, count, percentage }) => (
          <div key={star} className="flex items-center gap-5 mb-2">
            <div className="flex items-center">
              <span className="text-gold mr-2">{star}</span>
              <FaStar className="text-gold" />
            </div>
            <div className="w-[30rem] bg-gray-300 rounded-full h-4 flex">
              <div
                className="bg-gold h-4"
                style={{ width: `${percentage}%` }}
              ></div>
              <div
                className="bg-gray/15 h-4"
                style={{ width: `${100 - percentage}%` }}
              ></div>
            </div>
            <div className="text-right text-dark-gray">{percentage}%</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {totalReviews > 0 ? (
          reviews.map((review, idx) => (
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
                        i < review.rating ? "text-gold" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-lg">{review.comment}</p>
              <p className="text-sm text-gray mt-4">
                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default AllReviewsPage;
