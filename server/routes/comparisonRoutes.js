import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  addToComparisonList,
  getComparisonList,
} from "../controllers/comparisonController.js";

const router = express.Router();

router.post("/comparison/:propertyId", isLoggedIn, addToComparisonList);

router.get("/comparison", isLoggedIn, getComparisonList);

export default router;
