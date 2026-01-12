import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import axiosInstance from "@/utils/axiosInstance";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axiosInstance.get("/company/get");
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
          console.log("Companies fetched:", res.data.companies);
        }
      } catch (error) {
        console.error("❌ Get companies error:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
