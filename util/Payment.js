import Stripe from 'stripe';
// import dotenv from 'dotenv';
// dotenv.config();
async function payment({
    stripe = new Stripe(process.env.STRIP_KEY),
    payment_method_types=['card'],
    mode='payment',
    customer_email,
    metadata={},
    discounts=[], 
    line_items=[]
}={}){
    
    const session=await stripe.checkout.sessions.create({
        payment_method_types,
        mode,
        customer_email,
        metadata,
        cancel_url:process.env.CANCEL_URL,
        success_url:process.env.SUCCESS_URL,
        discounts,
        line_items
    })
    return session;
} 
export default payment;