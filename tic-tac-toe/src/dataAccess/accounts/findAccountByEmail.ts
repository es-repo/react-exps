import { Account } from '../../model/accounts/account';
import { query, where, getDocs } from 'firebase/firestore';
import collectionDefinition from './collectionDefinition';
import collectionRef from './collectionRef';

export type FindAccountByEmail = (email: string) => Promise<Account | null>;

export async function findAccountByEmail(email: string): Promise<Account | null> {
  const getByEmailQuery = query(collectionRef, where(collectionDefinition.fields.email, '==', email));

  const querySnapshot = await getDocs(getByEmailQuery);
  if (querySnapshot.empty) {
    return null;
  }

  const accountDocSnapshot = querySnapshot.docs[0];
  const account: Account = accountDocSnapshot.data() as Account;
  account.id = accountDocSnapshot.id;

  return account;
}
