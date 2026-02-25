"use server"

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "./error";
import { cookies } from "next/headers";

/**
 * returns all common headers
 * @returns 
 */
const getHeaders = () => ({
    Cookie: cookies().toString()
})

export const post = async(path: string, formData: FormData) =>{
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json", ...getHeaders()},
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parseRes = await res.json();

    //return an error
    if(!res.ok){
        return {error: getErrorMessage(parseRes)};
    }

    return {error:""};
}

export const get = async (path: string) => {
    const res = await fetch(`${API_URL}/${path}`, {
        headers: {...getHeaders()},
    });

    return res.json();
}