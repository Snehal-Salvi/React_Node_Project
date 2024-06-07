import express from "express";
import bodyParser from 'body-parser';
import { connectToDb } from "./config/mongoose.js";

const app = express();

app.use(bodyParser.json());

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
  connectToDb();
});
