import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  Matches,
  IsOptional,
  isString,
} from "class-validator";
import { IsArray } from "sequelize-typescript";
class RegisterUserDTO {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsPhoneNumber("VN" || "US" || "CA")
  @Matches(/^\d{10}$/, { message: "Phone number must be 10 digits" })
  public phone?: string;

  public isVerified: boolean;

  public role: string[];

  constructor(
    fullName: string,
    email: string,
    phone?: string,
    isVerified: boolean = false,
    role?: string[]
  ) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone || undefined;
    this.isVerified = isVerified;
    this.role = role || ["User"];
  }
}

export default RegisterUserDTO;
