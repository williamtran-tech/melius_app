import nodemailer from "nodemailer";

export default class MailUtil {
  public sendMail(
    to: string,
    subject: string,
    message: string
  ) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL_ADDRESS,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: process.env.ADMIN_EMAIL_ADDRESS,
      to: to,
      subject: subject,
      html: message,
    };

    console.log(mailOptions);
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw err;
      }
      console.log("Email sent: " + info.response);
    });
  }
}
