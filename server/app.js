import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import isLoggedIn from "./middlewares/isLogedInMiddleware.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import fileUpload from "express-fileupload";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/auth", authRoutes);
app.use("/api", propertyRoutes);
app.use("/api", reviewRoutes);
app.use("/api", notificationRoutes);

app.use(errorHandler);

export default app;
