import React from "react";
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import useGetAllJobs from "../hooks/useGetAllJobs";

const LatestJobs = () => {
  useGetAllJobs(); // fetch jobs

  const { allJobs } = useSelector((store) => store.job);

  console.log("Redux allJobs:", allJobs); // should show your Frontend Developer job

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="font-bold text-4xl text-center mb-10">
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allJobs && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No Job Available
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
