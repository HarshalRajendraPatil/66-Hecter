import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", isLoggedIn, adminMiddleware, getAllUsers);

router.get("/:userId", isLoggedIn, getUser);

router.put("/:userId", isLoggedIn, updateUser);

router.delete("/:userId", isLoggedIn, deleteUser);

export default router;
