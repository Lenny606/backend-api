import nodemailer from 'nodemailer';
import { NODEMAILER_PASSWORD } from '../env';

export const accountEmail = "@gmail";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: accountEmail,
        pass: NODEMAILER_PASSWORD
    }
})