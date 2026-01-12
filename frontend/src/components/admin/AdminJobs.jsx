import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-62.5"
          placeholder="Filter by company name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={() => navigate("/admin/jobs/create")}>
          New Job
        </Button>
      </div>

      <AdminJobsTable />
    </div>
  );
};

export default AdminJobs;
