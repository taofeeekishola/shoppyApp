import { API_URL } from "../common/constants/api"

//standradizing the location for the images uploaded
export const getProductImage = (productId: number) => {
    return `${API_URL}/images/products/${productId}.jpg`
}