import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 THIS IS THE IMPORTANT PART
  useEffect(() => {
    if (!singleCompany) return;

    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null, // NEVER set file from backend
    });
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={submitHandler} className="space-y-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/companies")}
        >
          <ArrowLeft /> Back
        </Button>

        <div>
          <Label>Name</Label>
          <Input
            name="name"
            value={input.name}
            onChange={(e) =>
              setInput({ ...input, name: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            name="description"
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Website</Label>
          <Input
            name="website"
            value={input.website}
            onChange={(e) =>
              setInput({ ...input, website: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            name="location"
            value={input.location}
            onChange={(e) =>
              setInput({ ...input, location: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Logo</Label>
          <Input
            type="file"
            onChange={(e) =>
              setInput({ ...input, file: e.target.files[0] })
            }
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default CompanySetup;
