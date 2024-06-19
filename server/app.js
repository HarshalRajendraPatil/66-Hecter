import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import fileUpload from "express-fileupload";
import notificationRoutes from "./routes/notificationRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

export default app;
