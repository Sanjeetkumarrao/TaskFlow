import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }  
})

export default transporter;