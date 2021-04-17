import { SentMessageInfo } from 'nodemailer';
import mailer from '../core/mailer';

interface SendEmailProps {
  from: string
  to: string
  subject: string
  html: string
}

const defaultCallback = (error: Error | null, info: SentMessageInfo): void => {
  if (error) {
    console.log(error);
  } else {
    console.log(info);
  }
};

export default async ({
  from,
  to,
  subject,
  html
}: SendEmailProps, callback = defaultCallback): Promise<void> => {
  await mailer.sendMail({
    from,
    to,
    subject,
    html
  }, callback);
};
