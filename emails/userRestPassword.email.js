import { createTransport } from "nodemailer";
import{userRestPasswordHTML} from './userRestPassword.html'
import  jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
export async function sendMail(options) {

    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'hagershaaban7@gmail.com',
            pass: 'piuzrzeaegecmplz', // generated ethereal password
        },
    });
    let token =jwt.sign({options},process.env.JWT_KEY) 
    let info = await transporter.sendMail({
        from: '"HMS" <hagershaaban7@gmail.com>',
        to: options,
        subject: "[HMS] Please verify your Email ",
        html: userRestPasswordHTML(token)
    });
}