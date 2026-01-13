import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Pen, Mail, Contact, FileText } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog"; // ✅ FIXED PATH
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <div className="bg-white border border-gray-200 my-5 p-8 rounded-2xl mx-auto max-w-4xl">
        {/* Top */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen size={18} />
          </Button>
        </div>

        {/* Contact */}
        <div className="my-5 space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
<div className="flex gap-2 flex-wrap">
  {user?.profile?.skills?.length > 0 ? (
    user.profile.skills.map((skill, index) => (
      <Badge key={index}>{skill}</Badge>
    ))
  ) : (
    <span className="text-gray-500">Not Applicable</span>
  )}
</div>



        {/* Resume */}
        <div>
          <Label className="font-semibold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#6A38C2] hover:underline"
            >
              <FileText size={18} />
              View Resume
            </a>
          ) : (
            <span className="text-sm text-gray-500">Not Uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6">
        <h1 className="font-bold mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
