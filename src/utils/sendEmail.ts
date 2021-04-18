import { SentMessageInfo } from 'nodemailer';
import consola from 'consola';
import mailer from '../core/mailer';

interface SendEmailProps {
  from: string
  to: string
  subject: string
  html: string
}

const sendEmail = async ({
  from, to, subject, html
}: SendEmailProps, callback) => {
  await mailer.sendMail({
    from,
    to,
    subject,
    html
  }, callback
    || ((err: Error | null, info: SentMessageInfo) => {
      if (err) {
        consola.error(err);
      } else {
        consola.info(info);
      }
    }));
};

export default sendEmail;
