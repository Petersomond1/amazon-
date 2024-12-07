import { CustomError } from '../../utils/customErrorHandler.js';
import {query} from '../../config/queries.js';
import Stripe from 'stripe'
import sendEmail from '../../utils/sendEmail.js';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

export const createStripeCheckoutSession = async (cartItems, userEmail, userId)=>{
    try {

        const lineItems  = cartItems.map((item=>({
           price_data: {
            currency:'usd',
            product_data: {
                name: item.name,
                images:[item.image],
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
            customer_email: process.env.MAIL_USER,
            metadata: {userId}
        })
        return session.url;
    } catch (error) {
        throw new CustomError("issue with service to create stripe session URL !", 400, error.message)
    }
}

export const handleStripeWebhookService = async (paymentData)=>{
    const payment_query = `
        INSERT INTO payments (session_id, email, amount, currency, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        paymentData.sessionId,
        paymentData.customerEmail,
        paymentData.amount,
        paymentData.currency,
        paymentData.status,
        new Date(),
    ];

    try {
        await query(payment_query, values )
    } catch (error) {
        throw new CustomError("Failed to save payment details: ",500 , error.message)
    }
}

export const clearCartItems = async (userId) => {
    const cart_query = `DELETE FROM cart_items WHERE user_id = ?`;

    try {
        const result = await query(cart_query, [userId]);

    } catch (error) {
        throw new Error('Failed to clear cart items: ' + error.message);
    }
};

export const sendAdminNotification = async (id, amount_total) => {
    console.log("before admin n")

    try {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: 'Payment Confirmation',
            html: `
                <h1>Thank you for your payment!</h1>
                <p>We received your payment of $${amount_total / 100}.</p>
                <p>Transaction ID: ${id}</p>
            `,
        };
            console.log("before admin notif", mailOptions)
            await sendEmail(mailOptions);
    } catch (error) {
        throw new CustomError("cannot send admin notfication"+ error.message)
    }
}
