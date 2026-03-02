"use server";

import { FormError } from "@/app/common/interface/form-error.interface";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/error";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";

/***
 * This will call the createUser api
 */
export default async function createUser(
    _prevState: FormError,
    formData: FormData
) {
    const { error } = await post("users", formData);
    if(error){
        return { error }
    }

    redirect("/")
}