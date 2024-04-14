"use client";
import React, { useState } from "react";
import Card from "./Cards";
import JobDetails from "./jobdetails";

const submissionDetails = ({ submissionData }) => {
  const [job, setJob] = React.useState(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" grid-cols-2 w-[80%] hidden lg:grid mx-auto gap-4 mt-5 ">
        <div className="grid grid-cols-1 w-[100%] mx-auto gap-4 h-screen overflow-y-scroll tw-a-scroll-config pb-20  ">
          {submissionData?.length > 0
            ? submissionData?.map((data, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setJob(data);
                      setOpen(true);
                    }}
                    className={`${
                      job?._id === data?._id
                        ? "bg-blue-50"
                        : !job?._id?.length && index === 0
                        ? "bg-blue-50"
                        : "bg-white"
                    } cursor-pointer  w-[96%]`}
                  >
                    {" "}
                    <Card data={data} />
                  </div>
                );
              })
            : ""}
        </div>
        <div className="p-4">
          <JobDetails job={job ? job : submissionData?.[0]} />
        </div>
      </div>
      <div className=" grid-cols-1 w-[80%] grid lg:hidden mx-auto gap-4 mt-5 ">
        {open === false ? (
          <div className="grid grid-cols-1 w-[100%] mx-auto gap-4 h-auto tw-a-scroll-config pb-20  ">
            {submissionData?.length > 0
              ? submissionData?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setJob(data);
                        setOpen(true);
                      }}
                      className={`${
                        job?._id === data?._id
                          ? "bg-blue-50"
                          : !job?._id?.length && index === 0
                          ? "bg-blue-50"
                          : "bg-white"
                      } cursor-pointer  w-[96%]`}
                    >
                      {" "}
                      <Card data={data} />
                    </div>
                  );
                })
              : ""}
          </div>
        ) : (
          <div className="p-4">
            <div
              className="w-full flex justify-end"
              onClick={() => setOpen(false)}
            >
              X
            </div>
            <JobDetails job={job ? job : submissionData?.[0]} />
          </div>
        )}
      </div>
    </>
  );
};

export default submissionDetails;
