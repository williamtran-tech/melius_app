interface IUser {
  _id: string;
  fullName: string;
  password: string;
  phone: string;
  email: string;
  role: string;
  img: string;
  verified: boolean;
}

export default IUser;
