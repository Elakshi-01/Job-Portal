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
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/home"); // or '/' depending on your routes
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="flex max-w-7xl mx-auto h-16 items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link to="/home">
            Job<span className="text-[#F83002]">Hunt</span>
          </Link>
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-10">
          <ul className="flex gap-6 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#36068b]">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                {user && user.role === "student" && (
                  <div className="flex flex-col gap-2 text-gray-600 mb-2">
                    <Link to="/profile" className="flex items-center gap-2 hover:text-black">
                      <User2 size={18} />
                      <span className="text-sm">View Profile</span>
                    </Link>
                  </div>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 hover:text-black mt-2"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
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
