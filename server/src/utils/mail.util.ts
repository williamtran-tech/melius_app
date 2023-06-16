import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

export default class MailUtil {
  private myOAuth2Client: OAuth2Client;
  private accessTokenObject: any;
  // private transporter: nodemailer.Transporter;

  constructor() {
    this.myOAuth2Client = new OAuth2Client(
      process.env.EMAIL_CLIENT_ID,
      process.env.EMAIL_CLIENT_SECRET
    );

    this.myOAuth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN,
    });

    // Generate the access token

    // ya29.a0AWY7CknXD_rok8Q6eB0M0tD7Sp1vv9EMVO8Yvct7R33VrHx2_ycNKXw9nNF9IiziIwFEZGDLNO8FMeFAraUtDTnNg9ujkH2v6yIQskOT8Zv-jIOXNF1JslqPziwI1u4UAfRyXxQdcQkq9oBxX4UwzY4JcTHiaCgYKAdQSARISFQG1tDrpqRpHLkmVvbC0w-Uwwwvf6g0163
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
