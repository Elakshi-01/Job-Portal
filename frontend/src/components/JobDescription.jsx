import React, { useState } from "react";
import Navbar from "./ui/shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "sonner";

const JobDescription = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const applyJobHandler = async () => {
    if (isApplied) return;

    try {
      setLoading(true);

      // 🔜 API call will go here
      // await axios.post(`/apply/job/${jobId}`)

      setIsApplied(true);
      toast.success("Successfully applied for the job");
    } catch (error) {
      toast.error("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl mb-2">Frontend Developer</h1>

            <div className="flex items-center gap-3">
              <Badge variant="ghost" className="text-blue-700 font-bold">
                12 Positions
              </Badge>
              <Badge variant="ghost" className="text-[#F83002] font-bold">
                Part Time
              </Badge>
              <Badge variant="ghost" className="text-[#7209b7] font-bold">
                24 LPA
              </Badge>
            </div>
          </div>

          {/* Apply Button */}
          <Button
            onClick={applyJobHandler}
            disabled={isApplied || loading}
            className={`rounded-lg px-6 transition-all ${
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

        {/* Divider */}
        <h1 className="border-b-2 border-gray-300 font-medium py-4 mt-8">
          Job Description
        </h1>

        {/* Details */}
        <div className="my-4 space-y-2 text-sm">
          <p><strong>Role:</strong> Frontend Developer</p>
          <p><strong>Location:</strong> Hyderabad</p>
          <p>
            <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
          <p><strong>Experience:</strong> 2 yrs</p>
          <p><strong>Salary:</strong> 12 LPA</p>
          <p><strong>Total Applicants:</strong> 4</p>
          <p><strong>Posted Date:</strong> 17-07-2024</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
