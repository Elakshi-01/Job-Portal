import Job from "../models/job.model.js";

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

    // ❌ BLOCK BAD JOBS
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company is required",
      });
    }

    if (typeof requirements === "string") {
      requirements = requirements
        .split(",")
        .map(r => r.trim())
        .filter(Boolean);
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* ================= GET ALL JOBS ================= */
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim();

    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
      total: jobs.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};


/* ================= GET ADMIN JOBS ================= */
export const getAdminJobs = async (req, res) => {
  try {
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
