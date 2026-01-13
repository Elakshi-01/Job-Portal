import React, { useMemo } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { keyword } = useSelector((store) => store.filter);

  const filteredJobs = useMemo(() => {
    if (!keyword) return allJobs;

    return allJobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        job.location?.toLowerCase().includes(keyword.toLowerCase()) ||
        job.salary?.toString().includes(keyword)
      );
    });
  }, [allJobs, keyword]);

  return (
    <div className="mx-auto mt-5 max-w-7xl grid grid-cols-4 gap-6">
      {/* LEFT FILTER */}
      <FilterCard />

      {/* RIGHT JOBS */}
      <div className="col-span-3">
        {filteredJobs.length === 0 ? (
          <span className="text-gray-500">Job not found</span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
