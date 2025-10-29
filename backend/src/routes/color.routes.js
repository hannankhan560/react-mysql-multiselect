import express from "express";
import { getColors, saveSelectedColors, getSavedColors } from "../controllers/color.controller.js";

const router = express.Router();

router.get("/colors", getColors);     
router.post("/save", saveSelectedColors);  
router.get("/saved", getSavedColors);      

export default router;
