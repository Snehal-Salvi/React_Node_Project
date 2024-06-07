import express from "express";
import bodyParser from 'body-parser';
import { connectToDb } from "./config/mongoose.js";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.send("App is working");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
  connectToDb();
});
