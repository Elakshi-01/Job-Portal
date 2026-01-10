import React from "react";
import Navbar from "./ui/shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Pen, Mail, Contact, FileText } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog ";
import { useSelector } from "react-redux";

const skills = ["HTML", "CSS", "JavaScript", "React"];
const isResume = true;

 
const Profile = () => {
  

  // example resume link (replace with backend url later)
  const resumeUrl =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    const [open,setOpen]=useState(false);

const {user} = useSelector( store => store.auth)




  return (
    <div>
      

      <div className="bg-white border border-gray-200 my-5 p-8 rounded-2xl mx-auto max-w-4xl">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage
                src="https://cdn.dribbble.com/userupload/42899095/file/original-578bafa6b0810c22da9b842de09f6a72.jpg"
                alt="profile"
                className="w-24 h-24"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p className="text-sm text-gray-600">
            {user?.profile?.bio}
              </p>
            </div>
          </div>

          <Button     onClick={ () => setOpen(true) }                  variant="outline">
            <Pen size={18} />
          </Button>
        </div>

        {/* Contact Info */}
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
        <div className="mb-6">
          <h1 className="font-medium mb-2">Skills</h1>

          <div className="flex gap-2 flex-wrap">
            {    user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">Not Applicable</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="grid w-full max-w-sm gap-1.5">
          <Label className="text-md font-black">Resume</Label>

          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#6A38C2] font-medium hover:underline"
            >
              <FileText size={18} />
              View Resume
            </a>
          ) : (
            <span className="text-sm text-gray-500">Not Applicable</span>
          )}
        </div>





      </div>
      
<div className="max-w-4xl mx-auto rounded-2xl bg-white">
<h1>Applied Jobs</h1>
<AppliedJobTable></AppliedJobTable>

</div>


<UpdateProfileDialog   open={open} setOpen={setOpen}     />




    </div>
  );
};

export default Profile;
