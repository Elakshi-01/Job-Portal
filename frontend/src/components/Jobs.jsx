import React from "react";
import Navbar from "./ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      

      <div className="mx-auto mt-5 max-w-7xl grid grid-cols-4 gap-6">

        {/* LEFT FILTER */}
        <FilterCard />

        {/* RIGHT JOBS */}
        <div className="col-span-3">

          {allJobs.length <= 0 ? (
            <span className="text-gray-500">Job not found</span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Jobs;
