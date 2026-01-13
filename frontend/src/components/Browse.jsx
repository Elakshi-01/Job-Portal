import React, { useEffect } from "react";

import Job from "./Job";
import { useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";

const Browse = () => {
  const { allJobs = [] } = useSelector(store => store.job);

  const dispatch = useDispatch();

useEffect(() => {
    
return () => {

dispatch(setSearchedQuery(""))
}



  }, []);


  return (
    <div>
      

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold my-10 text-xl">
          Search Results : ({allJobs.length})
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-gray-500 text-center">No jobs found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allJobs.map(job => (
              <Job job={job} key={job._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
