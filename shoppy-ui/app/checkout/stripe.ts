import {loadStripe} from "@stripe/stripe-js"
import type { Stripe } from "@stripe/stripe-js"

//intialising the stripe client
let stripePromise: Promise<Stripe | null>;

const getStripe =  () =>{
    if (!stripePromise) {
        stripePromise =  loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY! //provided by runtime
        );
        console.log("Calling....")
    }

    return stripePromise;
}

export default getStripe;