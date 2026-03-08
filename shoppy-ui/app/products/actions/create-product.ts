"use server";

import { API_URL } from "@/app/common/constants/api";
import { post } from "@/util/fetch";
import {getHeaders } from "@/util/fetch";
import { revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData){
    const response = await post("products", formData);
    const productImage = formData.get("image")

    //checking if the image is a file and there was no error while creating the product
    if (productImage instanceof File && !response.error){
        await uploadProductImage(response.data.id,productImage);
    }
    console.log(productImage)
    revalidateTag("products","") //checks the tag to re-run the get products query
    return response;
}

//uploading the file
async function uploadProductImage(productId: number, file: File){
    const formData = new FormData();
    formData.append("image", file)
    await fetch(`${API_URL}/products/${productId}/image`,{
        body: formData,
        method: 'POST',
        headers: await getHeaders(false)
    })
}