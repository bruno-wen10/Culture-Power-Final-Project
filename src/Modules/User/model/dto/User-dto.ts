export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  profilePicture?: string;
  jewelsAmount?: number;
  products?: string[];

  constructor(userData?: userDTO) {
    this.name = userData?.name;
    this.email = userData?.email;
    this.password = userData?.password;
    this.role = userData?.role;
    this.profilePicture = userData?.profilePicture;
    this.jewelsAmount = userData?.jewelsAmount;
    this.products = userData?.products;
  }
}

export type userDTO = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  profilePicture?: string;
  jewelsAmount?: number;
  products?: string[];
};
