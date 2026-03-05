import { Card, Typography } from "@mui/material";
import { Product as IProduct } from "./interface/product.interface";

interface ProductProps {
    product: IProduct
}

//compnent for each product
export default function Product({product }: ProductProps) {
    return (
        <Card className="p-4">
            <Typography variant="h4">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>${product.price}</Typography>
        </Card>
    )
}