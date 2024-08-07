import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { envs } from '../envs'; // Asegúrate de tener tus variables de entorno configuradas
import { storeVerificationCode } from './verificationCodes';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envs.GMAIL_USER,
        pass: envs.GMAIL_PASS,
    },
});

const getHtmlTemplate = (code: string) => {
    const filePath = path.join(__dirname, '../../email/Page.html');
    let html = fs.readFileSync(filePath, 'utf8');
    return html.replace('{{verificationCode}}', code);
};

export const verifyTokenAndSendCode = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: 'Token is required' });
    }
    
    try {
        const decoded = jwt.verify(token, envs.JWT_SECRET as string) as any;
        const email = decoded.user.email;

        // Genera el código de verificación
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Guarda el código en el array temporal
        storeVerificationCode(email, verificationCode);

        // Lee la plantilla HTML y reemplaza el código de verificación
        const html = getHtmlTemplate(verificationCode);

        // Envía el correo electrónico
        await transporter.sendMail({
            from: envs.GMAIL_USER,
            to: email,
            subject: 'Tu código de verificación',
            text: `Este es tu código de verificación: ${verificationCode}`, // Texto plano como respaldo
            html, // Plantilla HTML con el código de verificación
        });

        res.status(200).json({ status: 'Verification code sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'Error sending verification code' });
    }
};