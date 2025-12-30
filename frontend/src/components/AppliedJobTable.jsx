import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  const appliedJobs = [
    {
      date: "17-07-2025",
      role: "Frontend Developer",
      company: "Google",
      status: "Selected",
    },
    {
      date: "18-07-2025",
      role: "React Developer",
      company: "Amazon",
      status: "Pending",
    },
  ];

  return (
    <div className="mt-5">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.date}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={
                      job.status === "Selected"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }
                  >
                    {job.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No jobs applied yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
