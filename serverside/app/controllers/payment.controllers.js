import sendEmail from '../../utils/sendEmail.js';
import {clearCartItems, createStripeCheckoutSession, handleStripeWebhookService, sendAdminNotification } from '../services/paymentService.js'

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
    console.log("this one works")
    const sig = req.headers['stripe-signature']
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;

            //save payment details to database
            await handleStripeWebhookService({
                sessionId: session.id,
                cutomerEmail: sessionStorage.customer_details.email,
                amount: session.amout_total / 100,
                currency: session.currency,
                status: 'success',
            })

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
            await sendAdminNotification()
        
            res.status(200).send({received: true})    
        }else{
            res.status(400).send(`Unable to send events`)
        }
    } catch (error) {
        next(error)
    }
}