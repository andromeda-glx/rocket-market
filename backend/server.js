import express from "express";
import cors from "cors";
import router from "./routes/products.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// for accessing MONGO_URI
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", router);

app.listen(5000, () => {
  connectDB();
  console.log("Server's at http://localhost:5000");
});
