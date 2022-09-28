import { Account } from '../../model/accounts/account';
import { addDoc } from 'firebase/firestore';
import collectionDefinition from './collectionDefinition';
import collectionRef from './collectionRef';

export type AddAccount = (account: Account) => Promise<Account>;

export async function addAccount(account: Account): Promise<Account> {
  const docRef = await addDoc(collectionRef, {
    [collectionDefinition.fields.email]: account.email,
    [collectionDefinition.fields.password]: account.password
  });

  account.id = docRef.id;

  return account;
}
