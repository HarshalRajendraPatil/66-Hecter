// routes/bookingRoutes.js
import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/:propertyId", isLoggedIn, createBooking);

router.get("/", isLoggedIn, adminMiddleware, getAllBookings);

router.get("/:id", isLoggedIn, getBooking);

router.put("/:id", isLoggedIn, updateBooking);

router.delete("/:id", isLoggedIn, deleteBooking);

export default router;
