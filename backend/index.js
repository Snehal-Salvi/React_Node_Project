import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDb } from "./config/mongoose.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
  connectToDb();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
