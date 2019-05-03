export class FirebaseUserModel {
  image: string;
  name: string;
  email: string;
  provider: string;
  companyId: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.email = "";
    this.provider = "";
    this.companyId = "";
  }
}