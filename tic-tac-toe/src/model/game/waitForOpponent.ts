import { delay } from '../../utils/promise-utils';

export async function waitForOpponent(): Promise<string> {
  await delay(3000);
  return 'opponent@email.com';
}
