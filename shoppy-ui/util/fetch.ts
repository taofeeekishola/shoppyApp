"use server";

import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "./error";
import { headers } from "next/headers";

//getting the common headers when sending a request
export const getHeaders = async (isJson = true) => {
  const h = new Headers();

  //setting to true if we are sending json data
  if (isJson) {
    h.set("Content-Type", "application/json");
  }

  try{
    const reqHeaders = await headers();
    const cookie = reqHeaders.get("cookie");
    if (cookie) h.set("cookie", cookie);
  }catch{

  }
  return h; 
};

//posting to the database
export const post = async (path: string, data: FormData | object) => {
  //checking if data is formdata or object
  const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: await getHeaders(true),
    body: JSON.stringify(body),
  });

  const parseRes = await res.json();

  if (!res.ok) return { error: getErrorMessage(parseRes) };

  return { error: "", data: parseRes};
};


//retriving from the database
export const get = async <T>(
  path: string, 
  tags?: string[], 
  params?: URLSearchParams
) => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`
  const res = await fetch(url, {
    headers: await getHeaders(true),
    next: {tags}
  });

  const data = await res.json(); //add await here
  console.log("API response:", data);
  return data as T;
};
 