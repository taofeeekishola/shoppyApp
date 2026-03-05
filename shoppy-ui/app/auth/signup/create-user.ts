"use server";

import { FormResponse } from "@/app/common/interface/form-response.interface";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/util/error";
import { post } from "@/util/fetch";
import { redirect } from "next/navigation";

/***
 * This will call the createUser api
 */
export default async function createUser(
    _prevState: FormResponse,
    formData: FormData
) {
    const { error } = await post("users", formData);
    if(error){
        return { error }
    }

    redirect("/")
}