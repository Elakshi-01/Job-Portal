import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setSingleJob } from "@/redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  /* ================= FETCH JOB ================= */
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          if (user && res.data.job.applications) {
            const applied = res.data.job.applications.some(
              (app) => app.applicant?.toString() === user._id
            );
            setIsApplied(applied);
          }
        }
      } catch (error) {
        toast.error("Failed to load job details");
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch, user]);

  /* ================= APPLY JOB ================= */
  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply");
      return;
    }

    if (isApplied) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: user._id },
            ],
          })
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to apply"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
  

      <div className="max-w-7xl mx-auto my-10 px-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl mb-2">
              {singleJob?.title || "Job Title"}
            </h1>

            <div className="flex gap-3 flex-wrap">
              <Badge variant="ghost" className="text-blue-700 font-bold">
                {singleJob?.positions
                  ? `${singleJob.positions} Position${
                      singleJob.positions > 1 ? "s" : ""
                    }`
                  : "N/A"}
              </Badge>

              <Badge variant="ghost" className="text-[#F83002] font-bold">
                {singleJob?.jobType || "N/A"}
              </Badge>

              <Badge variant="ghost" className="text-[#7209b7] font-bold">
                {singleJob?.salary
                  ? `${singleJob.salary} LPA`
                  : "N/A"}
              </Badge>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <Button
            onClick={applyJobHandler}
            disabled={isApplied || loading}
            className={`rounded-lg px-6 ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f08a8]"
            }`}
          >
            {loading
              ? "Applying..."
              : isApplied
              ? "Already Applied"
              : "Apply Now"}
          </Button>
        </div>

        {/* DESCRIPTION */}
        <h2 className="border-b-2 border-gray-300 font-medium py-4 mt-8">
          Job Description
        </h2>

        <div className="my-4 space-y-2 text-sm">
          <p>
            <strong>Role:</strong> {singleJob?.title || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {singleJob?.location || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {singleJob?.description || "N/A"}
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {singleJob?.experienceLevel || "N/A"}
          </p>
          <p>
            <strong>Salary:</strong>{" "}
            {singleJob?.salary
              ? `${singleJob.salary} LPA`
              : "N/A"}
          </p>
          <p>
            <strong>Total Applicants:</strong>{" "}
            {singleJob?.applications?.length || 0}
          </p>
          <p>
            <strong>Posted Date:</strong>{" "}
            {formatDate(singleJob?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
