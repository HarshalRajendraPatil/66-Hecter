// Requiring all the important packages
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

// Middleware for checking if the user is logged in or not
router.get("/", async (req, res, next) => {
  // Getting the token if it exists
  const token = req.cookies.jwt;

  // Redirecting the user to the login page if no token exists
  if (!token) return res.status(400).json({ isLoggedIn: false });

  // Verifying the token if the token exists
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(400).json({ isLoggedIn: false });
  });

  res.status(200).json({
    status: "success",
    isLoggedIn: true,
  });
});

export default router;
