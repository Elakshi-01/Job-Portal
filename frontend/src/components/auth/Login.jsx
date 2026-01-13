import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading,user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) return toast.error("Please select role");

    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post("/user/login", input);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };



useEffect(() => {   
  
  if(user){
    navigate("/");
  }
}, []);





  return (
    <div>
      <Navbar />
      <div className="flex max-w-7xl mx-auto justify-center items-center">
        <form onSubmit={submitHandler} className="w-1/2 border p-4 my-10 rounded-md">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <Label>Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeEventHandler} required />

          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeEventHandler} required />

          <div className="flex gap-4 my-4">
            <label>
              <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} /> Student
            </label>
            <label>
              <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} /> Recruiter
            </label>
          </div>

          {loading ? (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full" type="submit">Login</Button>
          )}

          <p className="text-sm mt-2">
            Don't have an account? <Link to="/signup" className="text-blue-700">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
