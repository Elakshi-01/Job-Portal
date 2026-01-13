import express from "express";
import {
  postJob,
  getAllJobs,     // ✅ FIXED NAME
  getAdminJobs,
  getJobById,
} from "../controllers/job.controllers.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

/* ================= POST JOB ================= */
router.post("/post", isAuthenticated, postJob);

/* ================= GET ALL JOBS (PUBLIC) ================= */
router.get("/get", getAllJobs);

/* ================= GET ADMIN JOBS ================= */
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

/* ================= GET JOB BY ID ================= */
router.get("/get/:id", getJobById);

export default router;
