import {loadStripe} from "@stripe/stripe-js"
import type { Stripe } from "@stripe/stripe-js"

//intialising the stripe client
let stripePromise: Stripe | null = null;

const getStripe =  async () =>{
    if (!stripePromise) {
            stripePromise =  await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY! //provided by runtime
        );
    }

    return stripePromise;
}

export default getStripe;