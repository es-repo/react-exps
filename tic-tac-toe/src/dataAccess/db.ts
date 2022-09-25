import { Identible } from '../model/identible';
import { delay } from '../utils/promise-utils';

type Db = Record<string, Table>;

type Table = Record<string, Identible>;

const key = 'db';
const delayMs = 1000;

export async function upsert(tableName: string, record: Identible): Promise<void> {
  const db: Db = JSON.parse(localStorage.getItem(key) ?? '{}') as Db;
  db[tableName] = db[tableName] ?? {};

  const table: Table = db[tableName];
  table[record.id] = record;
  localStorage.setItem(key, JSON.stringify(db));

  await delay(delayMs);
}

export async function get<T extends Identible>(tableName: string, id: string): Promise<T | null> {
  const db: Db = JSON.parse(localStorage.getItem(key) ?? '{}') as Db;

  await delay(delayMs);

  return (db[tableName]?.[id] as T) ?? null;
}
