"use client";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SubmissionDetails from "./submissionDetails";

import { Input, Pagination, Spin } from "antd";
import { useRouter } from "next/navigation";
const { Search } = Input;

const Page = (props) => {
  const { id, email, username, name, desc } = props || {};
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState("");
  const [customSearch1, setCustomSearch1] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
  });
  const [currentPage, setCurrentPage] = useState(0);

  const [error, setError] = useState(null);
  async function getDesc(id) {
    try {
      const apiurl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const url = `${apiurl}desc/${id}`;
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const json = await response.json();
      return json?.data;
    } catch (err) {
      return "";
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiurl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const url = `${apiurl}/search?page=${currentPage}&&keyword=${desc}`;
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const json = await response.json();
        setJobs(json);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const apiurl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const url = `${apiurl}/search?keyword=${
          desc?.length > 0 ? desc + " " + customSearch : customSearch
        }&&page=${currentPage}`;
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const json = await response.json();
        setJobs(json);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [customSearch, currentPage]);

  const onSearch = (value, _e, info) => {
    _e.stopPropagation();
    _e.preventDefault();
    setLoading(true);
    setCustomSearch(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {" "}
        <Spin
          spinning={loading}
          tip="Fetching Data"
          fullscreen={customSearch?.length > 0 ? false : true}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const submissionData = jobs?.[0]?.submissionData;
  const count = jobs?.[0]?.count?.[0]?.count?.lowerBound;

  return (
    <div>
      <Navbar />

      <div className="w-full flex justify-center mt-5">
        <Search
          placeholder="Search Jobs Here"
          allowClear
          value={customSearch1 || ""}
          onChange={(e) => {
            setCustomSearch1(e.target.value || "");
            setCurrentPage(0);
          }}
          size="large"
          onSearch={onSearch}
          className="w-[400px]"
        />
      </div>
      <div className=" flex justify-between mx-auto w-[80%] flex-wrap my-10 lg:my-0">
        <div>
          <h2 className="font-bold ">Welcome back {name}</h2>
        </div>
        <Pagination
          pageSize={25}
          showSizeChanger={false}
          onChange={(e) => {
            setCurrentPage(e);
          }}
          current={currentPage}
          total={count}
        />
      </div>
      <div>
        <SubmissionDetails submissionData={submissionData} />
      </div>
    </div>
  );
};

export default Page;
