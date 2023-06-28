import { IsEmail, IsString } from "class-validator";

class LogInDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export default LogInDTO;
