"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/util/error";
import { redirect } from "next/navigation";

/***
 * This will call the createUser api
 */
export default async function createUser(
    _prevState: any,
    formData: FormData
) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: formData,
    });

    const parseRes = await res.json();

    //return an error
    if(!res.ok){
        return {error: getErrorMessage(parseRes)};
    }

    //rediret after a positive response
    redirect("/");
}