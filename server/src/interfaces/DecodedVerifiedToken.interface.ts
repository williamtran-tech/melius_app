import RegisterUserDTO from "../models/User/UserRegister.DTO";
interface DecodedVerifiedToken {
  email: string;
  user: RegisterUserDTO;
  verifiedCode: string;
  isVerified: boolean;
}

export default DecodedVerifiedToken;
