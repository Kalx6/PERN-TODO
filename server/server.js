import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.js";
import checkRoutes from "./routes/check.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.json());

app.use("/todo", todoRoutes);
// app.use("/check", checkRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the PERN TODO API");
});
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
