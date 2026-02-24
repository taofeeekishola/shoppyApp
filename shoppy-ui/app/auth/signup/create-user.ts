"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/util/error";
import { post } from "@/util/fetch";
import { redirect } from "next/navigation";

/***
 * This will call the createUser api
 */
export default async function createUser(
    _prevState: any,
    formData: FormData
) {
    const { error } = await post("users", formData);
    if(error){
        return { error }
    }

    redirect("/")
}