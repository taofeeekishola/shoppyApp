import { redirect } from "next/navigation";
import Grid from "@mui/material/Grid";
import getProducts from "./actions/get-products";
import Product from "./product";

//component for all the products
export default async function Products() {
    const products = await getProducts();

    //if the user is not authenticated, redirect to login
    // if (!Array.isArray(products)) {
    //     redirect("/auth/login");
    // }
    
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <Product product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}
