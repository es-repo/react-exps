import { Account } from '../../model/accounts/account';
import * as db from '../db';
import tableName from './tableName';

export type FindByEmail = (email: string) => Promise<Account | null>;

export async function findByEmail(email: string): Promise<Account | null> {
  return await db.get(tableName, email);
}
