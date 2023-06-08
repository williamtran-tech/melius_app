import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
} from "class-validator";

class CreateUserDTO {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @IsPhoneNumber("VN" || "US" || "CA")
  public phone: string;

  constructor(
    fullName: string,
    email: string,
    password: string,
    phone: string
  ) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}

export default CreateUserDTO;
