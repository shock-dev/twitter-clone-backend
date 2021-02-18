import mailer from "../core/mailer";

interface SendEmailProps {
    from: string
    to: string
    subject: string
    html: string
}

export default async ({ from, to, subject, html }: SendEmailProps, callback): Promise<void> => {
    await mailer.sendMail({ from, to, subject, html }, callback);
}
