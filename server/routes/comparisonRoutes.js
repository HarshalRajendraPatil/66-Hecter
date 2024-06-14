import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import {
  addAndRemoveFromComparisonList,
  getComparisonList,
} from "../controllers/comparisonController.js";

const router = express.Router();

router.post("/:propertyId", isLoggedIn, addAndRemoveFromComparisonList);

router.get("/", isLoggedIn, getComparisonList);

export default router;
