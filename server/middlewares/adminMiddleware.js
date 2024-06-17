import catchAsync from "../utils/catchAsync.js";

const adminMiddleware = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      message: "User not found",
    });
  }

  // Check if the user role is 'admin'
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied. Admins only.",
    });
  }

  // User is an admin, proceed to the next middleware or route handler
  next();
});

export default adminMiddleware;
