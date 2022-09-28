import { Account } from '../../model/accounts/account';
import { query, where, getDocs } from 'firebase/firestore';
import collectionDefinition from './collectionDefinition';
import collectionRef from './collectionRef';

export type FindByEmail = (email: string) => Promise<Account | null>;

export async function findByEmail(email: string): Promise<Account | null> {
  const getByEmailQuery = query(collectionRef, where(collectionDefinition.fields.email, '==', email));

  const querySnapshot = await getDocs(getByEmailQuery);
  if (querySnapshot.empty) {
    return null;
  }

  const accountDoc = querySnapshot.docs[0].data();
  const account: Account = accountDoc as Account;

  return account;
}
