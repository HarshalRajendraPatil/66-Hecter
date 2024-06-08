import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import isLoggedIn from "./middlewares/isLogedInMiddleware.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/auth", authRoutes);
app.use("/api", propertyRoutes);

app.use(errorHandler);

export default app;
