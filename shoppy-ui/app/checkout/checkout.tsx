"use client"

import { Button } from "@mui/material"
import checkOut from "./actions/checkout"
import getStripe from "./stripe"

interface CheckoutProps {
    productId: number
}

export default function Checkout({ productId }: CheckoutProps){

    const handleCheckout = async () =>{
        const session = await checkOut(productId);
        window.location.href = session.data.url;
    }

    return (
        <Button variant="contained" className="max-w-[25%]" onClick={handleCheckout}>
            Buy Now
        </Button>
    )
}