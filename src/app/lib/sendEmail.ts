import nodemailer from "nodemailer";

export default async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME, // Add this to your environment variables
        pass: process.env.EMAIL_PASSWORD, // Add this to your environment variables
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
    });

    return { success: true, info };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
}
