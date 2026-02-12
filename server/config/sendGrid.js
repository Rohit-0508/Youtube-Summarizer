const nodemailer = require('nodemailer');
require('dotenv').config();

if (!process.env.BREVO_SMTP_USER) {
  throw new Error("BREVO_SMTP_USER is not defined in environment variables");
}
if (!process.env.BREVO_SMTP_PASS) {
  throw new Error("BREVO_SMTP_PASS is not defined in environment variables");
}


const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

const sendEmail = async ({to, subject, text, html})=>{
  try{
    const info = await transporter.sendMail({
      from: `"Clipsum" <otp@clipsum.in>`,
      to, 
      subject,
      text: text || '',
      html: html || '',
    });

    console.log("Email sent: ", info.messageId);
    return info;
  }catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
}

module.exports = {sendEmail};