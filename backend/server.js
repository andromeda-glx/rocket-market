import express from "express";
import cors from "cors";
import router from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', router);

// app.get('ads', (req, res) => {
//     req.params
//     req.query
// })

app.listen(5000, () => {
  console.log("Server's at http://localhost:5000");
});
