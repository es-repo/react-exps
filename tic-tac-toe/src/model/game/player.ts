import { Piece } from './piece';

export interface Player {
  accountId: string;
  accountEmail: string;
  piece: Piece;
}
