"use client";

import moment from "moment";

export default function Cards(props) {
  const { data } = props || {};
  return (
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {data?.["Job Title"]}
            {/* <ArrowUpRight className="ml-2 h-4 w-4" /> */}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {data?.["Job Description"]}
          </p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              Posting Date:{" "}
              {data && data["Job Posting Date"]
                ? moment
                    .utc(data["Job Posting Date"])
                    .format("dddd, D MMMM YYYY")
                : ""}
            </span>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900">
                Salary Details: {data?.["Salary Range"]}
              </span>
              <span className="text-[10px] font-medium text-gray-900">
                Experience: {data?.["Experience"]}
              </span>
              <span className="text-[10px] font-medium text-gray-500">
                Qualifications: {data?.["Qualifications"]}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
