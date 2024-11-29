import {createStripeCheckoutSession} from '../services/paymentService.js'

import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_KEY); 


export const processPayment = async (req, res) =>{
    const {products} = req.body
    let total = 0;
    for (let x in products)
    {
        total += products[x].price * products[x].quantity
    }
    const amountInCents = total * 100;


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amountInCents, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("issue in getting payment link", error)
    }
    
}

export const saveRecordToDB = async (req, res)=>{
    try {
        console.log("req body ", req.body)
    } catch (error) {
        console.error("someerror here ", error)
        res.Status(500).json(error)
    }
}

export const CreateCheckoutSessions = async (req, res, next)=>{
    try {
        const {cartItems} = req.body;
        const sessionUrl = await createStripeCheckoutSession(cartItems);
        res.json({url:sessionUrl})
    } catch (error) {
        next(error)
    }
}