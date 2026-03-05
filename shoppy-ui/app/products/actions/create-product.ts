"use server";

import { post } from "@/util/fetch";
import { revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData){
    const response = post("products", formData);
    revalidateTag("products","") //checks the tag to re-run the get products query
    return response;
}