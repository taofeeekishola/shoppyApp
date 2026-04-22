"use server"

import { get } from "@/util/fetch"
import { Product } from "../interface/product.interface";

export default async function getProducts() {
    console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL)
    return get<Product[]>('products', ["products"], new URLSearchParams({ status: "avaliable"}));
}