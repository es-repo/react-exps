import { Account } from '../../model/accounts/account';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firestore';
import collectionDefinition from './collectionDefinition';

export type Upsert = (account: Account) => Promise<Account>;

export async function upsert(account: Account): Promise<Account> {
  const docRef = await addDoc(collection(firestore, collectionDefinition.name), {
    [collectionDefinition.fields.email]: account.email,
    [collectionDefinition.fields.password]: account.password
  });

  account.id = docRef.id;

  return account;
}
