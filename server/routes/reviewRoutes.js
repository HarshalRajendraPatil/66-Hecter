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

router.use(isLoggedIn);

// Get all reviews
router.get("/", adminMiddleware, getAllReviews);

// Get a single review
router.get("/:reviewId", getReview);

// Add a review to the property
router.post("/properties/:propertyId", addReview);

// Get all reviews for a property.
router.get("/properties/:propertyId", getAllPropertyReviews);

// Get all reviews by a user
router.get("/users", getAllReviewsByUser);

// Update a review.
router.put("/:reviewId", updateReview);

// Delete a review.
router.delete("/:reviewId", deleteReview);

export default router;
