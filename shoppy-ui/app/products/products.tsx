import getAuthentication from "../auth/actions/get-authentication";
import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

//component for all the products
export default async function Products() {
    const products = await getProducts();
    const isAuthenticated = await getAuthentication();
    
    return <ProductsGrid products={products} isAuthenticated={isAuthenticated}/>;
  
}
