import dayjs from "dayjs";
import { emailTemplates } from "./email-templates/template";
import transporter, { accountEmail } from "../config/nodemailer";

export const sendReminderEmail = async ({
    to, type, subscription
}) => {
    if (!to || !from) {
        throw new Error("Missing params");

    }

    const template = emailTemplates.find((template) => {
        template.label === type
    })

    if (!template) {
        throw new Error("Missing template");
    }

    const mailInfo = {
        userName: subscription.userName.userName,
        subscriptionName: subscription.userName,
        renewalDate: dayjs(subscription.renewalDate).format("DD/MM/YYYY"),
        planName: subscription.planName,
        price: subscription.price,
      
    }

    const message = template.generateBody(mailInfo)
    const subject = template.generateSubject(mailInfo)

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendEmail(mailOptions, (err, info) => {
        if (err) {
            return console.error(err, "mail failed")
        }

        //send

    })
} 