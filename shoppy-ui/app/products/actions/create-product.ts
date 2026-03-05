"use server";

import { post } from "@/util/fetch";

export default async function createProduct(formData: FormData){
    return post("products", formData);
}