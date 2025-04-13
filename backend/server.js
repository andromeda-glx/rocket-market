import express from "express";
import cors from "cors";
import router from "./routes/products.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// for accessing MONGO_URI
dotenv.config(); // loads environment variables from a .env file into process.env

const app = express();
app.use(cors()); // to allow cross-origin requests
app.use(express.json()); // to parse JSON data from requests
app.use("/api/products", router); // to handle requests to the products API

app.listen(5000, () => {
  connectDB();
  console.log("Server's at http://localhost:5000");
});


/*
    Middleware: A function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. It's used to modify the request and response objects, end the request-response cycle, and call the next middleware function in the stack.
*/