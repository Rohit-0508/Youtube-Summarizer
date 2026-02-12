const axios = require('axios');
require('dotenv').config();

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY not defined");
}

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: "Clipsum",
          email: "otp@clipsum.in",
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html || "",
        textContent: text || "",
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Email sent via API");
    return response.data;

  } catch (error) {
    console.error("Brevo API error:", error.response?.data || error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
