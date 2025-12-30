import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// ✅ ADD multer to REGISTER (profile photo upload)
router.post(
  "/register",
  singleUpload, // expects field name "file"
  register
);

// ✅ LOGIN (no file)
router.post("/login", login);

// ✅ UPDATE PROFILE
router.post(
  "/profile/update",
  isAuthenticated,
  singleUpload,
  updateProfile
);

// ✅ LOGOUT
router.get("/logout", logout);

export default router;
