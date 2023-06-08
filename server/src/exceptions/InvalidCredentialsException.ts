import HttpException from "./HttpException";

class InvalidCredentialsException extends HttpException {
  constructor() {
    super(400, "Invalid credentials");
  }
}

export default InvalidCredentialsException;
