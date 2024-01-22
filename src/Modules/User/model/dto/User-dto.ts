export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  products?: string[];

  constructor(userData?: userDTO) {
    this.name = userData?.name;
    this.email = userData?.email;
    this.password = userData?.password;
    this.profilePicture = userData?.profilePicture;
    this.products = userData?.products;
  }
}

type userDTO = {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  products?: string[];
};
