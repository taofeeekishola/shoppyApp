"use server"

import { post } from "@/util/fetch";

//creating a server function to call checkout api
export default async function checkOut(productId: number){
    console.log("I am getting here")
    return post('checkout/session', { productId } )

} 