import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
} from "class-validator";

class CreateUserDTO {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsPhoneNumber("VN" || "US" || "CA")
  public phone?: string;

  @IsOptional()
  public gender: string;

  @IsOptional()
  public DOB: Date;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @IsOptional()
  public role?: string;

  constructor(
    fullName: string,
    email: string,
    password: string,
    DOB: Date,
    gender: string,
    phone?: string,
    role?: string
  ) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phone = phone || undefined;
    this.DOB = DOB;
    this.gender = gender;
    this.role = role || "User";
  }
}

export default CreateUserDTO;
