import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "12345"; // replace with real id later

  return (
    <div className="rounded-xl p-5 shadow-md bg-white border border-gray-100 flex flex-col justify-between">
      
      {/* Top row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 my-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://cdn.dribbble.com/userupload/42899095/file/original-578bafa6b0810c22da9b842de09f6a72.jpg" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-semibold text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job details */}
      <div className="flex-1">
        <h2 className="font-bold text-lg mb-2">Frontend Developer</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
          laudantium porro perspiciatis facilis officiis.
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="ghost" className="font-semibold text-blue-700">
          12 Positions
        </Badge>
        <Badge variant="ghost" className="font-semibold text-red-500">
          Part Time
        </Badge>
        <Badge variant="ghost" className="font-semibold text-purple-700">
          24 LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-5">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/description/${jobId}`)}
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
