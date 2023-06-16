import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  Matches,
  IsOptional,
} from "class-validator";
class RegisterUserDTO {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsPhoneNumber("VN" || "US" || "CA")
  @Matches(/^\d{10}$/, { message: "Phone number must be 10 digits" })
  public phone?: string;

  constructor(fullName: string, email: string, phone?: string) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone || undefined;
  }
}

export default RegisterUserDTO;
