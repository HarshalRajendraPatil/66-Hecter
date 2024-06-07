import app from "./app.js";
import db from "./config/db.js";
import http from "http";

import dotevn from "dotenv";
dotevn.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
