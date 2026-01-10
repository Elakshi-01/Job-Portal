import express from "express"
import { getAdminJobs, getAllJob, getJobById, postJob } from "../controllers/job.controllers.js"
import isAuthenticated  from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJob);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(getJobById);

export default router