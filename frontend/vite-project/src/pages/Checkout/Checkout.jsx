import Stripe from "stripe";
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripekey= import.meta.env.VITE_SOME_KEY;
const stripe_Promise=loadStripe(stripekey);

export const Checkout=()=>{

    const amount =899;

    return(
       <>
       <h1>Complete your order</h1>
       <Elements stripe={stripe_Promise} options={{clientSecret:'constant_secret'}}>
        <CheckoutForm amount={amount}></CheckoutForm>
       </Elements>
       </>
    )
}