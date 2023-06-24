import RegisterUserDTO from "../models/User/UserRegister.DTO";
interface DecodedUserToken {
  id: number;
  user: RegisterUserDTO;
}
export default DecodedUserToken;
