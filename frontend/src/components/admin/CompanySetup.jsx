import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import axiosInstance from "@/utils/axiosInstance";

const CompanySetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector(store => store.company);

  useGetCompanyById(id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await axiosInstance.put(
        `/company/update/${id}`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-xl mx-auto my-10">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/admin/companies")}
      >
        <ArrowLeft /> Back
      </Button>

      <h1 className="font-bold text-xl my-4">Company Setup</h1>

      {["name", "description", "website", "location"].map(field => (
        <div key={field} className="my-2">
          <Label>{field}</Label>
          <Input
            value={input[field]}
            onChange={e =>
              setInput({ ...input, [field]: e.target.value })
            }
          />
        </div>
      ))}

      <Label>Logo</Label>
      <Input
        type="file"
        onChange={e =>
          setInput({ ...input, file: e.target.files[0] })
        }
      />

      <Button type="submit" className="w-full my-4">
        Update
      </Button>
    </form>
  );
};

export default CompanySetup;
