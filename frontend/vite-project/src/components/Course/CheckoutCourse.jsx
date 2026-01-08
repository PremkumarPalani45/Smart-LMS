import {useStripe,useElements,paymentElement} from '@stripe/stripe-js'
import { useState } from 'react'

const CheckoutCourse = () => {

    const [loading,Setloading]=useState(true);
     const [message,SetMessage]=useState('');
    const stripe=useStripe();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      Setloading(true);
      
      const { error } = await stripe.confirmPayment({
 // `Elements` instance that's used to create the Express Checkout Element.
    elements,
    // `clientSecret` from the created PaymentIntent
    // clientSecret,
    confirmParams: {
      return_url: `${windows.origin}/complete`,
    },
    // Uncomment below if you only want redirect for redirect-based payments.
    // redirect: 'if_required',
}) ;
if (error) {
  SetMessage(error.message)
  console.log(error)
}
else{
  // customer redirected to this url
  SetMessage("something went wrong")
}
Setloading(false);
    }
  return (
    <form id='course_payment' onSubmit={handleSubmit}>
     <paymentElement id='course-payment-element'/>
     <button disabled={loading} id='submit'>
       Pay now {loading && <div className='spinning' id='spinning'></div>}
     </button>
     {message && <span>{message}</span>}
    </form>
  )
}

export default CheckoutCourse