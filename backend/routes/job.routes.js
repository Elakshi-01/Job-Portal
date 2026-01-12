import express from "express";
import {
  postJob,
  getAllJob,
  getAdminJobs,
  getJobById,
} from "../controllers/job.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJob);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", getJobById);

export default router;
