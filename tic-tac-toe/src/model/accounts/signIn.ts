import { findAccountByEmail, FindAccountByEmail } from '../../dataAccess/accounts/findAccountByEmail';
import { Result } from '../result';
import { Account } from './account';

export async function signIn(findAccountByEmail: FindAccountByEmail, signInData: SignInData): Promise<SignInResult> {
  const existedAccount = await findAccountByEmail(signInData.email);

  if (existedAccount == null || existedAccount.password != signInData.password) {
    return { type: 'err', value: 'Wrong email or password.' };
  }

  return { type: 'ok', value: existedAccount };
}

export interface SignInData {
  email: string;
  password: string;
}

export type SignInErr = string;

export type SignInResult = Result<Account, SignInErr>;

export type SignIn = (signInData: SignInData) => Promise<SignInResult>;

export const signIpImpl: SignIn = (signIpData: SignInData) => signIn(findAccountByEmail, signIpData);
