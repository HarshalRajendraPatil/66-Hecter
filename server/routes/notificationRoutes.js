import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Add a review to the property
// router.post("/notifications", isLoggedIn, createNotification);

// Get all reviews for a property.
router.get("/", isLoggedIn, getMyNotifications);

// Get all reviews by a user
router.put("/:notificationId", isLoggedIn, markAsRead);

// Delete a review.
router.delete("/:notificationId", isLoggedIn, deleteNotification);

export default router;
