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
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const allAppliedJobs =
    useSelector((store) => store.job.allAppliedJobs) || [];

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
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't applied to any jobs yet
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {new Date(appliedJob.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {appliedJob?.job?.title || "NA"}
                </TableCell>

                <TableCell>
                  {appliedJob?.job?.company?.name || "NA"}
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={
                      appliedJob.status === "Accepted"
                        ? "bg-green-600"
                        : appliedJob.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }
                  >
                    {appliedJob.status || "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
