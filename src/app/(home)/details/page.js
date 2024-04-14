"use server";
import { currentUser } from "@clerk/nextjs";
import React from "react";

import axios from "axios";
import Navbar from "../home/[[...home]]/Navbar";

async function saveData(data, id) {
  try {
    // Define the data to be sent in the request body
    const postData = {
      description: data.get("description"),
      userId: id, // Example userId
    };

    // Define the URL of the endpoint you want to send the POST request to
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}desc`;

    // Make the POST request using axios
    const response = await axios.post(url, postData, {
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
    });

    console.log("Success:", response.data);
    // Handle successful response data
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
}

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
const page = async () => {
  const user = await currentUser();
  const description = await getDesc(user.id);

  return (
    <div className="w-[80%] flex flex-col   h-screen mx-auto ">
      <Navbar from="details" />
      <div className="mt-20">
        <h1 className="text-3xl font-bold">
          {" "}
          Hi {user?.firstName + " " + user?.lastName}
        </h1>
      </div>
      <form
        className="w-full  h-screen flex justify-center flex-col gap-4"
        action={(e) => {
          "use server";
          saveData(e, user?.id);
        }}
      >
        <textarea
          name="description"
          defaultValue={description || ""}
          placeholder="Type Your Description "
          className="border outline-none w-full h-[50vh] p-10 rounded-lg"
        />
        <div className="flex justify-end">
          <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
