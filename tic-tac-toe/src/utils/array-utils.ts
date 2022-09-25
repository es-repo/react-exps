export function create2dArray<T>(size: number, defaultValue: T): T[][] {
  const array: T[][] = new Array<T[]>(size);

  for (let i = 0; i < size; i++) {
    array[i] = Array<T>(size).fill(defaultValue);
  }

  return array;
}
