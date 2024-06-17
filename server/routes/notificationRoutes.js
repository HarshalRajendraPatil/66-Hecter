import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  getMyNotifications,
  getAllNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Add a review to the property
// router.post("/notifications", isLoggedIn, createNotification);

// Get all notifications
router.get("/", isLoggedIn, adminMiddleware, getAllNotifications);

// Get all reviews for a property.
router.get("/my-notification", isLoggedIn, getMyNotifications);

// Get all reviews by a user
router.put("/:notificationId", isLoggedIn, markAsRead);

// Delete a review.
router.delete("/:notificationId", isLoggedIn, deleteNotification);

export default router;
