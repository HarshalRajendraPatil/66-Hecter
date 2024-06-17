import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  addReview,
  getReview,
  getAllReviews,
  getAllPropertyReviews,
  getAllReviewsByUser,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Get all reviews
router.get("/", isLoggedIn, adminMiddleware, getAllReviews);

// Get a single review
router.get("/:reviewId", isLoggedIn, getReview);

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
