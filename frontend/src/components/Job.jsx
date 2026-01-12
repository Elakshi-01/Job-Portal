import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Calculate days ago
  const postedDate = new Date(job?.createdAt);
  const daysAgo = Math.floor(
    (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="rounded-xl p-5 shadow-md bg-white border border-gray-100 flex flex-col justify-between">
      
      {/* Top */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo >= 0
            ? `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`
            : "Recently"}
        </p>

        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 my-4">
        <Avatar className="w-10 h-10">
          {job?.company?.logo ? (
            <AvatarImage
              src={job.company.logo}
              alt={job.company.name}
            />
          ) : (
            <AvatarFallback>
              {job?.company?.name
                ? job.company.name.charAt(0)
                : "C"}
            </AvatarFallback>
          )}
        </Avatar>

        <div>
          <h1 className="font-semibold text-lg">
            {job?.company?.name || "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-500">
            {job?.location || "Unknown Location"}
          </p>
        </div>
      </div>

      {/* Job Info */}
      <div className="flex-1">
        <h2 className="font-bold text-lg mb-2">
          {job?.title || "Job Title"}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {job?.description || "No description available"}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="ghost" className="font-semibold text-blue-700">
          {job?.positions || 1} Position
          {job?.positions > 1 ? "s" : ""}
        </Badge>

        <Badge variant="ghost" className="font-semibold text-red-500">
          {job?.jobType || "Full Time"}
        </Badge>

        <Badge variant="ghost" className="font-semibold text-purple-700">
          {job?.salary ? `${job.salary} LPA` : "N/A"}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-5">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>

        <Button className="w-full bg-[#7209b7] hover:bg-[#5f08a8]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
