import { get } from "@/util/fetch";
import { Product } from "../interface/product.interface";

/**
 * calling the api to get a single product
 * @param productId 
 * @returns 
 */
export default async function getProduct(productId: number){
    return get<Product>(`products/${productId}`);
}