import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const reduxApplicants =
    useSelector((store) => store.application.applicants) || [];

  // ✅ local state for instant UI update
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    setApplicants(reduxApplicants);
  }, [reduxApplicants]);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Status updated successfully");

        // ✅ update UI instantly
        setApplicants((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status } : item
          )
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (!applicants.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No applicants found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <Table>
        <TableCaption>
          A list of your recent applied users
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                {item?.applicant?.fullname || "NA"}
              </TableCell>

              <TableCell>
                {item?.applicant?.email || "NA"}
              </TableCell>

              <TableCell>
                {item?.applicant?.phoneNumber || "NA"}
              </TableCell>

              {/* ✅ Resume */}
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </TableCell>

              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>

              {/* ✅ Status badge */}
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    item.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status || "Pending"}
                </span>
              </TableCell>

              {/* ✅ Action */}
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal />
                  </PopoverTrigger>

                  <PopoverContent className="w-32">
                    {shortListingStatus.map((status) => (
                      <div
                        key={status}
                        onClick={() =>
                          statusHandler(status, item._id)
                        }
                        className="py-2 cursor-pointer hover:text-black"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
