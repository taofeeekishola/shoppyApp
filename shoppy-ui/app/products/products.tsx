import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

//component for all the products
export default async function Products() {
    const products = await getProducts();
    
    return <ProductsGrid products={products}/>;
  
}
