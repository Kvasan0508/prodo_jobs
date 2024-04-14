"use client";
import moment from "moment";
import React from "react";

const JobDetails = ({ job }) => {
  return (
    <div
      className="max-w-full mx-auto bg-white shadow-md rounded-lg  pb-10 h-auto"
      suppressHydrationWarning
    >
      <div className="px-4 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {job?.["Job Title"]}
        </h2>
        <p className="text-sm text-gray-600">{job?.Company}</p>
        <p className="text-sm text-gray-600">
          {job?.["Company Profile"]?.City} {job?.["Company Profile"]?.State}
          {job?.Country}
        </p>
        <p className="mt-2 text-gray-700">{job?.["Job Description"]}</p>
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Job Details</h3>
        <ul className="mt-2 text-gray-700">
          <li>
            <strong>Experience:</strong> {job?.Experience}
          </li>
          <li>
            <strong>Qualifications:</strong> {job?.Qualifications}
          </li>
          <li>
            <strong>Salary Range:</strong> {job?.["Salary Range"]}
          </li>
          <li>
            <strong>Location:</strong> {job?.location}
          </li>
          <li>
            <strong>Work Type:</strong> {job?.WorkType}
          </li>
          <li>
            <strong>Company Size:</strong> {job?.["Company Size"]}
          </li>
          <li>
            <strong>Job Posting Date:</strong>{" "}
            {job && job["Job Posting Date"]
              ? moment.utc(job["Job Posting Date"]).format("dddd, D MMMM YYYY")
              : ""}
          </li>
          <li>
            <strong>Contact Person:</strong> {job?.["Contact Person"]}
          </li>
          <li>
            <strong>Contact:</strong> {job?.Contact}
          </li>
        </ul>
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Responsibilities
        </h3>
        <p className="mt-2 text-gray-700">{job?.Responsibilities}</p>
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
        <p className="mt-2 text-gray-700">{job?.skills}</p>
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
        <p className="mt-2 text-gray-700">
          {job?.Benefits?.replace("{'", "")?.replace("'}", "")}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
