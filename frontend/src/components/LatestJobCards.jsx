import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="shadow-xl bg-white border border-gray-100 cursor-pointer p-5 rounded-md hover:shadow-2xl transition">

      {/* Company Name & Location */}
      <div>
        <h1 className="text-lg font-medium">
          {job?.company?.name || "Unknown Company"}
        </h1>
        <p className="text-gray-500 text-sm">
          {job?.location || "India"}
        </p>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">

        <Badge variant="ghost" className="font-bold text-blue-700">
          {job?.positions} Positions
        </Badge>

        <Badge variant="ghost" className="font-bold text-[#F83002]">
          {job?.jobType}
        </Badge>

        <Badge variant="ghost" className="font-bold text-[#7209b7]">
          {job?.salary} LPA
        </Badge>

      </div>
    </div>
  );
};

export default LatestJobCards;
 