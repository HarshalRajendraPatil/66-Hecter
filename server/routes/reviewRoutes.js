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
router.post("/properties/:propertyId", isLoggedIn, addReview);

// Get all reviews for a property.
router.get("/properties/:propertyId", isLoggedIn, getAllPropertyReviews);

// Get all reviews by a user
router.get("/users", isLoggedIn, getAllReviewsByUser);

// Update a review.
router.put("/:reviewId", isLoggedIn, updateReview);

// Delete a review.
router.delete("/:reviewId", isLoggedIn, deleteReview);

export default router;
