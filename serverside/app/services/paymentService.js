import { CustomError } from '../../utils/customErrorHandler.js';
import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

export const createStripeCheckoutSession = async (cartItems)=>{
    try {
        const lineItems  = cartItems.map((item=>({
           price_data: {
            currency:'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
           } ,
           quantity: item.quantity
        })));
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url :`${process.env.CLIENT_URL}/success`,
            cancel_url :`${process.env.CLIENT_URL}/cancel`,
        })
        return session.url;
    } catch (error) {
        throw new CustomError("issue with service to create stripe session URL !", 400, error.message)
    }
}