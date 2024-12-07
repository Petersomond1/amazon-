import Stripe from 'stripe';
import sendEmail from '../../utils/sendEmail.js';
import {clearCartItems, createStripeCheckoutSession, handleStripeWebhookService, sendAdminNotification } from '../services/paymentService.js'
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

export const CreateCheckoutSessions = async (req, res, next)=>{
    try {
        const {cartItems} = req.body;
        const {id, email} = req.user;
        const sessionUrl = await createStripeCheckoutSession(cartItems, email, id);
        res.json({url:sessionUrl})
    } catch (error) {
        next(error)
    }
}

export const handleStripeWebhook = async (req, res, next)=>{
    const sig = req.headers['stripe-signature']
    
    try {
        // Use raw body to verify the signature

        const event = stripe.webhooks.constructEvent(
            req.body, // Raw body from express.raw middleware
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        if(event.type !== 'checkout.session.completed'){
            return res.status(400).send("issue in payment webhook")
        }
            const session = event.data.object;
            await handleStripeWebhookService({
                sessionId: session.id,
                customerEmail: session.customer_details.email, // Access customer email directly
                amount: session.amount_total / 100, // Corrected typo: 'amout_total' to 'amount_total'
                currency: session.currency,
                status: 'success',
            });
            

           // await clearCartItems()
            //send Confirmation eamil
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: process.env.MAIL_USER,  //when project is done , change to userEmail
                subject: 'Payment Confrimation',
                text: 'Thanks you for your payment!'
            }
           await sendEmail(mailOptions)

            //Notify admin
            await sendAdminNotification(session.id, session.amount_total)
            res.status(200).send({received: true})    
    } catch (error) {
        next(error)
    }
}