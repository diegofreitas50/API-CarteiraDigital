// import { Category } from "src/category/entities/category-entity";
// import { Transaction } from "src/transaction/entities/transaction-entity";

export class User {
  id?:string;
  name:string;
  email:string;
  password:string;
  cpf_cnpj:string;
//   category?:Category;
  wallet?:number;
//   transaction?: Transaction[];
  createdAt?:Date;
  updatedAt?:Date;
}