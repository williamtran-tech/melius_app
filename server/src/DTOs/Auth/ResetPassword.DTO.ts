import { IsEmail } from "class-validator";

class ResetPasswordDTO {
  @IsEmail()
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export default ResetPasswordDTO;
