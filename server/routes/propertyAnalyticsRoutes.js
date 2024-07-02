import express from "express";
import {
  getTopRatedProperties,
  getMostExpensiveProperties,
  getTopPropertiesToSale,
  getTopPropertiesToRent,
  getMostViewedProperty,
} from "../controllers/propertyAnalyticsController.js";

const router = express.Router();

// Route to get top 10 properties with high average rating
router.get("/top-rated", getTopRatedProperties);

// Route to get top 10 most expensive properties
router.get("/most-expensive", getMostExpensiveProperties);

// Route to get top 10 properties for sale
router.get("/sell-properties", getTopPropertiesToSale);

// Route to get top 10 properties for rent
router.get("/rent-properties", getTopPropertiesToRent);

// Route to get top 10 most viewed property
router.get("/most-viewed", getMostViewedProperty);

export default router;
