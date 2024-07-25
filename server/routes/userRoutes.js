import express from "express";
import isLoggedIn from "../middlewares/isLogedInMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getFavorites,
  updateProfilePic,
} from "../controllers/userController.js";

const router = express.Router();

router.use(isLoggedIn);

router.get("/", adminMiddleware, getAllUsers);

router.get("/favorites", getFavorites);

router.get("/:userId", getUser);

router.put("/", updateUser);

router.put("/img", updateProfilePic);

router.delete("/", deleteUser);

export default router;
