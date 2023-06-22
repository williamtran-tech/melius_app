import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

export default class MailUtil {
  private myOAuth2Client: OAuth2Client;
  // private transporter: nodemailer.Transporter;

  constructor() {
    this.myOAuth2Client = new OAuth2Client(
      process.env.EMAIL_CLIENT_ID,
      process.env.EMAIL_CLIENT_SECRET
    );

    this.myOAuth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN,
    });
  }

  public async getAccessToken() {
    const accessTokenObject = await this.myOAuth2Client.getAccessToken();
    return accessTokenObject;
  }

  public sendMail(
    accessToken: string,
    to: string,
    subject: string,
    message: string
  ) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        accessToken: accessToken,
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
