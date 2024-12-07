import nodeMailer from 'nodemailer';
import {CustomError} from './customErrorHandler.js';

const transporter = nodeMailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass:process.env.MAIL_PASS, // App password
    },
    tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
    },
});

const sendEmail = async (mailOptions) => {
    try {
         await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new CustomError("Email not sent", 500)
    }
}

export default sendEmail;