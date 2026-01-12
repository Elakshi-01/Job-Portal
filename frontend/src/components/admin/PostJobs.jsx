import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJobs = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    positions: "",
    companyId: "",
  });

  // ✅ FETCH COMPANIES
  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/company/get", {
        withCredentials: true,
      });
      if (res.data.success) {
        setCompanies(res.data.companies);
      }
    };
    fetchCompanies();
  }, []);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 🔥 CRITICAL FIX: convert string → array
    const payload = {
      ...input,
      requirements: input.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    // ✅ safety check
    if (payload.requirements.length === 0) {
      toast.error("Please enter at least one requirement");
      return;
    }

    try {
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job created successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Job creation failed");
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Post Job</h2>

      <Input name="title" placeholder="Job Title" onChange={changeHandler} />
      <Input name="description" placeholder="Description" onChange={changeHandler} />

      <Input
        name="requirements"
        placeholder="Requirements (comma separated)"
        onChange={changeHandler}
      />

      <Input name="salary" type="number" placeholder="Salary" onChange={changeHandler} />
      <Input name="experienceLevel" placeholder="Experience Level" onChange={changeHandler} />
      <Input name="location" placeholder="Location" onChange={changeHandler} />
      <Input name="jobType" placeholder="Job Type" onChange={changeHandler} />
      <Input name="positions" type="number" placeholder="Positions" onChange={changeHandler} />

      <Select onValueChange={(value) => setInput({ ...input, companyId: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Select Company" />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company._id} value={company._id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit">Post Job</Button>
    </form>
  );
};

export default PostJobs;
