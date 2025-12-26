import Stripe from 'stripe'

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {

   
  try {
   const args={
       amount: 2000,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
   }
}
//create payment intent
     const paymentIntent = await stripe.paymentIntents.create(args)
     // get secret from intent
     console.log(paymentIntent.client_secret)
     // return client secret to FE
      res.status(200).json({client_secret:paymentIntent.client_secret})
  }
  catch(err){
     console.log(err);
      res.status(500).json({ success: false, message: "Server error" });
  }
}
