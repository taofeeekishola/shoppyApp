import { Card, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interface/product.interface";
import Image from "next/image";
import { API_URL } from "../common/constants/api";

interface ProductProps {
    product: IProduct
}

//compnent for each product
export default function Product({product }: ProductProps) {
    return (
        <Card className="p-4">
            <Stack gap={3}>
                 <Typography variant="h4">{product.name}</Typography>
                {
                    product.imageExists && (
                        <Image 
                            src={`${API_URL}/images/products/${product.id}.jpg`}
                            width="0"
                            height="0"
                            className="w-full h-auto"
                            sizes="100vw"
                            alt="Picture of image"
                        />
                    )
                }
                <Typography>{product.description}</Typography>
                <Typography>${product.price}</Typography>
            </Stack>
        </Card>
    )
}