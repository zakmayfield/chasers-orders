import nodemailer from 'nodemailer';
import { GMAIL_APP_PASSWORD, GMAIL_USERNAME } from '@/shared/utils/constants';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USERNAME,
    pass: GMAIL_APP_PASSWORD,
    // type: 'OAuth2',
    // clientId: process.env.GOOGLE_CLIENT_ID,
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export default transporter;
