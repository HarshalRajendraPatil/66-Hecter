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
} from "../controllers/propertyController.js";

const router = express.Router();

// Create a new property
router.post("/properties", isLoggedIn, createProperty);

// Get all properties with optional filters
router.get("/properties", getAllProperties);

// Get a property by ID
router.get("/properties/:id", getPropertyById);

// Update a property by ID
router.put("/properties/:id", isLoggedIn, updateProperty);

// Delete a property by ID
router.delete("/properties/:id", isLoggedIn, deleteProperty);

// Get properties by user ID
router.get("/properties/user/:userId", isLoggedIn, getPropertiesByUser);

// Upload property media
router.post("/properties/:id/media", isLoggedIn, uploadPropertyMedia);

// Delete property media
router.delete(
  "/properties/:id/media/:mediaId",
  isLoggedIn,
  deletePropertyMedia
);

// Add and Remove property from favorites
router.post(
  "/properties/:id/favorites",
  isLoggedIn,
  addAndRemovePropertyFromFavorites
);

export default router;
