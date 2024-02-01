export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  jewelsAmount?: { power: number; mind: number; space: number };
  products?: string[];

  constructor(userData?: userDTO) {
    this.name = userData?.name;
    this.email = userData?.email;
    this.password = userData?.password;
    this.profilePicture = userData?.profilePicture;
    this.jewelsAmount = userData?.jewelsAmount;
    this.products = userData?.products;
  }
}

export type userDTO = {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  jewelsAmount?: { power: number; mind: number; space: number };
  products?: string[];
};
