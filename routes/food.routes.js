import express from "express";

import {
  createFood,
  getAllFood,
  getSingleFood,
  deleteFood,
  updateFood,
} from "../controllers/food.controller.js";

import upload from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const FoodRoutes = express.Router();

// Create Food
FoodRoutes.post(
  "/create-food",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createFood
);

// Get All Food
FoodRoutes.get("/get-all-food", getAllFood);

// Get Single Food
FoodRoutes.get("/get-single/:id", getSingleFood);

// Delete Food
FoodRoutes.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  deleteFood
);

// Update Food
FoodRoutes.put(
  "/update/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateFood
);

export default FoodRoutes;