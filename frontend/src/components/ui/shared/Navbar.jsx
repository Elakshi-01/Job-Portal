import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success("Logged out successfully");
        navigate("/"); // ✅ FIX
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="flex max-w-7xl mx-auto h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Hunt</span>
        </Link>

        <div className="flex items-center gap-10">
          <ul className="flex gap-6 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#36068b]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="mb-3">
                  <h4 className="font-medium">{user.fullname}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {user.role === "student" && (
                  <Link to="/profile" className="flex gap-2 mb-2">
                    <User2 size={18} /> Profile
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex gap-2 text-red-600"
                >
                  <LogOut size={18} /> Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
