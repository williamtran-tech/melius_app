import RegisterUserDTO from "../../DTOs/User/UserRegister.DTO";
interface DecodedUserToken {
  id: string;
  user: RegisterUserDTO;
}
export default DecodedUserToken;
