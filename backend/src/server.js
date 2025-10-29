import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colorRoutes from "./routes/color.routes.js";
import db from "../config/db.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

app.use("/api", colorRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
