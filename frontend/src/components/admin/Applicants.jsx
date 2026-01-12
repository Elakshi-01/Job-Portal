import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../ui/shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const applicants =
    useSelector((store) => store.application.applicants) || [];

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );

        // ✅ VERY IMPORTANT   
        dispatch(setAllApplicants(res.data?.job?.applications || []));
      } catch (error) {
        console.log(error);
        dispatch(setAllApplicants([]));
      }
    };

    fetchAllApplicants();
  }, [dispatch, id]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants.length})
        </h1>

        <ApplicantsTable />
      </div>
    </>
  );
};

export default Applicants;
