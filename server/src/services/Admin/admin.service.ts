import HttpException from "../../exceptions/HttpException";
import chalk from "chalk";
import { User } from "../../orm/models/user.model";
import { Role } from "../../orm/models/role.model";
import { Account } from "../../orm/models/account.model";

import MailUtil from "../../utils/mail.util";
import AuthenticationService from "../auth.service";
export default class AdminService {
    public authService = new AuthenticationService();
  public async createUser(userData: any) {
    try {
        // Check if email is already in use
        const checkAccount = await Account.findOne({
            where: {
                email: userData.email
            }
        });
        if (checkAccount) {
            throw new HttpException(409, "Doctor is already added");
        }
        // Create user
        const doctor = await User.create({
            fullName: userData.fullName,
            gender: userData.gender,
            dob: userData.dob,
        });
        console.log(doctor.id);

        // Create account
        const password = this.generatePassword();
        const hashedPassword = await this.authService.hashPassword(password);
        const account = await Account.create({
            email: userData.email,
            password: hashedPassword,
            userId: doctor.id,
            type: userData.type,
        });

        // Add role to user
        const role = await Role.findOne({
            where: {
                name: userData.role
            }
        });
        await doctor.$add("roles", role!.id);

        // Send email to doctor
        const mailUtil = new MailUtil();
        mailUtil.sendMail(
            account.email,
            "[Melius Application] Melius Doctor Department [Do not reply]",
            `<h1>Melius Application</h1>
            <p>Dear Mr/Mrs. ${doctor.fullName},</p>
            <p>Your password to access Melius Application:</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Please use this password to log in to your Melius Application account. We recommend that you change your password as soon as possible.</p>
            <p>Thank you for cooperating with Melius Application!</p>`
        );
        console.log(chalk.green("Password:", password));

        return {
            fullName: doctor.fullName,
            email: account.email,
        }
      
    } catch (err) {
      throw err;
    }
  }

  public async deleteUser(userId: number) {
    try {
        
    } catch (err) {
        throw err;
    }
  }

  public async undoDeleteUser(allergyID: number, kidId: number) {
    try {
        
    } catch (err) {
        throw err;
    }
  }

    private generatePassword() {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let password = "";
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
        password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];

        for (let i = 0; i < 4; i++) {
            const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle the password
        password = password.split("").sort(() => Math.random() - 0.5).join("");

        return password;
    }
}
