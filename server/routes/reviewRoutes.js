import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  addReview,
  getAllPropertyReviews,
  getAllReviewsByUser,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Add a review to the property
router.post("/properties/:propertyId/reviews", isLoggedIn, addReview);

// Get all reviews for a property.
router.get(
  "/properties/:propertyId/reviews",
  isLoggedIn,
  getAllPropertyReviews
);

// Get all reviews by a user
router.get("/users/reviews", isLoggedIn, getAllReviewsByUser);

// Update a review.
router.put("/reviews/:reviewId", isLoggedIn, updateReview);

// Delete a review.
router.delete("/reviews/:reviewId", isLoggedIn, deleteReview);

export default router;
