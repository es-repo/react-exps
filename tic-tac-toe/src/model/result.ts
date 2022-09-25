export interface ResultOk<T> {
  type: 'ok';
  value: T;
}

export interface ResultErr<T> {
  type: 'err';
  value: T;
}

export type Result<TOk, TErr> = ResultOk<TOk> | ResultErr<TErr>;
