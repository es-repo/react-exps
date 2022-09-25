import { Identible } from '../identible';

export interface Account extends Identible {
  email: string;
  password: string;
}
