import { IsString, IsEmail, IsPhoneNumber, Matches } from "class-validator";
class RegisterUserDTO {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsPhoneNumber("VN" || "US" || "CA")
  @Matches(/^\d{10}$/, { message: "Phone number must be 10 digits" })
  public phone: string;

  constructor(fullName: string, email: string, phone: string) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
  }
}

export default RegisterUserDTO;
