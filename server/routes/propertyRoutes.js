import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesByUser,
  uploadPropertyMedia,
  deletePropertyMedia,
  addAndRemovePropertyFromFavorites,
  getSimilarProperties,
} from "../controllers/propertyController.js";

const router = express.Router();

// Create a new property
router.post("/", isLoggedIn, createProperty);

// Get all properties with optional filters
router.get("/", getAllProperties);

// Get a property by ID
router.get("/:id", getPropertyById);

// Update a property by ID
router.put("/:id", isLoggedIn, updateProperty);

// Delete a property by ID
router.delete("/:id", isLoggedIn, deleteProperty);

// Get properties by user ID
router.get("/user/:userId", isLoggedIn, getPropertiesByUser);

// Upload property media
router.post("/:id/media", isLoggedIn, uploadPropertyMedia);

// Delete property media
router.delete("/:id/media/:mediaId", isLoggedIn, deletePropertyMedia);

// Add and Remove property from favorites
router.post("/:id/favorites", isLoggedIn, addAndRemovePropertyFromFavorites);

// Get the similar properties
router.get("/similar/:id", getSimilarProperties);

export default router;
