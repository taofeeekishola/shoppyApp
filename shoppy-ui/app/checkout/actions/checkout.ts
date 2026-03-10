"use server"

import { post } from "@/util/fetch";

/**
 * creating a server function to call checkout api
 * @param productId 
 * @returns 
 */
export default async function checkOut(productId: number){
    return post('checkout/session', { productId } )

} 