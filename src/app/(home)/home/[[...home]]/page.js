import { currentUser } from "@clerk/nextjs";
import React from "react";
import ClientPage from "./clientPage";
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
  const desc = await getDesc(user.id);

  return (
    <div>
      <ClientPage
        id={user?.id}
        desc={desc || ""}
        email={user?.emailAddresses?.[0]?.emailAddress}
        username={user?.username}
        name={user?.firstName + " " + user?.lastName}
      />
    </div>
  );
};

export default page;
