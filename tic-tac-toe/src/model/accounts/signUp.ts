import { findAccountByEmail, FindAccountByEmail } from '../../dataAccess/accounts/findAccountByEmail';
import { addAccount, AddAccount } from '../../dataAccess/accounts/addAccount';
import { Result } from '../result';
import { Account } from './account';

// TODO: Think about better name then ..Data
export interface SignUpData {
  email: string;
  password: string;
  agreementsAccepted: boolean;
}

export type SignUpErr = string;

export type SignUpResult = Result<Account, SignUpErr>;

export type SignUp = (signUpData: SignUpData) => Promise<SignUpResult>;

export async function signUp(
  findAccountByEmail: FindAccountByEmail,
  addAccount: AddAccount,
  signUpData: SignUpData
): Promise<SignUpResult> {
  if (signUpData.agreementsAccepted == false) {
    return { type: 'err', value: 'Agreements not accepted.' };
  }

  const existedAccount = await findAccountByEmail(signUpData.email);
  if (existedAccount != null) {
    return { type: 'err', value: 'Account already exists' };
  }

  const account: Account = { id: '', email: signUpData.email, password: signUpData.password };
  await addAccount(account);
  return { type: 'ok', value: account };
}

export const signUpImpl: SignUp = (signUpData: SignUpData) => signUp(findAccountByEmail, addAccount, signUpData);
