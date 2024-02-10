import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'darion.haley@ethereal.email',
        pass: '8PYTxWpXpd2A5pjvYy'
    },
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 45000, // 45 seconds
});

export default transporter