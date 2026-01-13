import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    resume: null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        resume: null,
      });
    }
  }, [user]);

  const changeHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = e => {
    setInput({ ...input, resume: e.target.files[0] });
  };

  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(input).forEach(key => {
        if (input[key]) formData.append(key, input[key]);
      });

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="fullname" value={input.fullname} onChange={changeHandler} />
          </div>

          <div>
            <Label>Email</Label>
            <Input name="email" value={input.email} onChange={changeHandler} />
          </div>

          <div>
            <Label>Phone</Label>
            <Input name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} />
          </div>

          <div>
            <Label>Bio</Label>
            <Input name="bio" value={input.bio} onChange={changeHandler} />
          </div>

          <div>
            <Label>Skills (comma separated)</Label>
            <Input name="skills" value={input.skills} onChange={changeHandler} />
          </div>

          <div>
            <Label>Resume (PDF)</Label>
            <Input type="file" accept="application/pdf" onChange={fileHandler} />
          </div>

          <DialogFooter>
            <Button disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
