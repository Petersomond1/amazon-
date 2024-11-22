import nodeMailer from 'nodemailer';
import {CustomError} from './customErrorHandler.js';

const sendEmail = async (userEmail) => {
    try {
        const transporter = nodeMailer.createTransport({
            service:process.env.MAIL_SERVICE,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        }) 


        const mailOptions = {
            from: process.env.MAIL_USER,
            to: userEmail,
            subject: 'WELCOME TO Amazon CLone',
            text: 'Congratulations! You have successfully registered to Amazon Clone!'
        }

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new CustomError("Email not sent", 500)
    }
}

export default sendEmail;