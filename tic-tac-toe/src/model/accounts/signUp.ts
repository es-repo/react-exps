import { findByEmail, FindByEmail } from '../../dataAccess/accounts/findByEmail';
import { upsert, Upsert } from '../../dataAccess/accounts/upsert';
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

export async function signUp(findByEmail: FindByEmail, upsert: Upsert, signUpData: SignUpData): Promise<SignUpResult> {
  if (signUpData.agreementsAccepted == false) {
    return { type: 'err', value: 'Agreements not accepted.' };
  }

  const existedAccount = await findByEmail(signUpData.email);
  if (existedAccount != null) {
    return { type: 'err', value: 'Account already exists' };
  }

  const account: Account = { id: '', email: signUpData.email, password: signUpData.password };
  await upsert(account);
  return { type: 'ok', value: account };
}

export const signUpImpl: SignUp = (signUpData: SignUpData) => signUp(findByEmail, upsert, signUpData);
