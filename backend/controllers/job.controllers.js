import { Job } from "../models/job.model.js";

/* ================= POST JOB ================= */
export const postJob = async (req, res) => {
  try {
    if (req.userRole !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can post jobs",
      });
    }

    let {
      title,
      description,
      salary,
      requirements,
      experienceLevel,
      location,
      jobType,
      positions,
      companyId,
    } = req.body;

    // ✅ FORCE ARRAY (BACKEND SAFETY)
    if (typeof requirements === "string") {
      requirements = requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }

    if (!requirements || requirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one requirement is required",
      });
    }

    const job = await Job.create({
      title,
      description,
      salary,
      requirements,
      experienceLevel,
      location,
      jobType,
      positions,
      company: companyId,
      created_by: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("POST JOB ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* ================= GET ALL JOBS (PUBLIC) ================= */
export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate("company", "name logo createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET ALL JOB ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ================= GET ADMIN JOBS (RECRUITER) ================= */
/* ================= GET ADMIN JOBS (RECRUITER) ================= */
export const getAdminJobs = async (req, res) => {
  try {
    // 🔥 FIXED: use correct field name `created_by`
    const jobs = await Job.find({ created_by: req.userId })
      .populate("company", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET ADMIN JOBS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ================= GET JOB BY ID ================= */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company", "name logo createdAt")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
