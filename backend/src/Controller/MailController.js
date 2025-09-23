import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-2.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_SMTP_USER,
    pass: process.env.AWS_SES_SMTP_PASS
  }
});

export async function sendEmail(req, res) {
  const { username, mail, to, title, content } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `${username} <${mail}>`,
      to,
      subject: title,
      html: `${content}`
    });

    return res.status(200).json({ message: "Email enviado com sucesso", info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao enviar email", error });
  }
}
