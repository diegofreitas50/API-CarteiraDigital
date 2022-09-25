// import { Category } from "src/category/entities/category-entity";
// import { Transaction } from "src/transaction/entities/transaction-entity";

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  CPF_CNPJ: string;
  logist?: boolean;
  wallet?: number;
  //   transaction?: Transaction[];
  createdAt?: Date;
  updatedAt?: Date;
}
