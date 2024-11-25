import nodeMailer from 'nodemailer';
import {CustomError} from './customErrorHandler.js';

const sendEmail = async (userEmail) => {

    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass:process.env.MAIL_PASS, // App password
            },
            tls: {
                rejectUnauthorized: false, // Ignore self-signed certificate errors
            },
        });
        

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,  //when project is done , change to userEmail
            subject: 'WELCOME TO Amazon CLone',
            text: 'Congratulations! You have successfully registered to Amazon Clone!'
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("here is my problem ", error)
        throw new CustomError("Email not sent", 500)
    }
}

export default sendEmail;