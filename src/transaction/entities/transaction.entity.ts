import { User } from 'src/user/entities/user.entity';

export class Transaction {
  id?: string;
  payerID: String;
  payee: User;
  value: number;
  isReverse: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
