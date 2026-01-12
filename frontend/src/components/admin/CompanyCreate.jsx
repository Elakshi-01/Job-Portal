import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axiosInstance from "@/utils/axiosInstance";

const CompanyCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!name) {
      toast.error("Company name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/company/register", {
        name, // ✅ FIXED FIELD NAME
      });

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Company creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">Create Company</h1>

      <Label>Company Name</Label>
      <Input
        className="my-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Google, Microsoft..."
      />

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/companies")}
        >
          Cancel
        </Button>
        <Button onClick={registerNewCompany} disabled={loading}>
          {loading ? "Creating..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default CompanyCreate;
