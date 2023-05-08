import Stripe from 'stripe';
export async function payment(){
    const stripe = new Stripe(process.env.STRIP_KEY)
} 