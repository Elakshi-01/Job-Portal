import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";

const useGetSingleJobs = (jobId) => {
  const dispatch = useDispatch();


};

export default useGetSingleJobs;
