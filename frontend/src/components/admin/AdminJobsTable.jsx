import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const AdminJobsTable = () => {
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  const { searchCompanyByText } = useSelector((store) => store.company);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchCompanyByText) {
      setFilterJobs(allAdminJobs);
    } else {
      setFilterJobs(
        allAdminJobs.filter((job) =>
          job?.company?.name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase())
        )
      );
    }
  }, [allAdminJobs, searchCompanyByText]);

  if (filterJobs.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No jobs posted yet
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>Your posted jobs</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterJobs.map((job) => (
          <TableRow key={job._id}>
            <TableCell>{job.company?.name}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>
              {job.createdAt?.split("T")[0]}
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    onClick={() =>
                      navigate(`/admin/jobs/${job._id}`)
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>

                  <div     onClick={ () => {
                    navigate(`/admin/jobs/${job._id}/applicants`)
                  }}          className="flex items-center gap-2 mt-2 cursor-pointer w-fit"      >
                    <Eye      className='w-4'  />
                    <span>Applicants</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
