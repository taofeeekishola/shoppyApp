"use server";

import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "./error";
import { headers } from "next/headers";

//getting the common headers when sending a request
const getHeaders = async () => {
  const h = new Headers();

  h.set("Content-Type", "application/json");

  const reqHeaders = await headers();
  const cookie = reqHeaders.get("cookie");
  if (cookie) h.set("cookie", cookie);

  return h; 
};

//posting to the database
export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(Object.fromEntries(formData)),
    cache: "no-store",
  });

  const parseRes = await res.json();

  if (!res.ok) return { error: getErrorMessage(parseRes) };
  return { error: "" };
};


//retriving from the database
export const get = async <T>(path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: await getHeaders(),
    cache: "no-store",
  });

  return res.json() as T; //read more
};
 