import { Account } from '../../model/accounts/account';
import * as db from '../db';
import tableName from './tableName';

export type Upsert = (account: Account) => Promise<Account>;

export async function upsert(account: Account): Promise<Account> {
  account.id = account.email;
  await db.upsert(tableName, account);
  return account;
}
