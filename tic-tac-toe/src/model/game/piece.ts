export type Piece = 'O' | 'X';

export function alternatePiece(piece: Piece): Piece {
  return piece == 'O' ? 'X' : 'O';
}

export function randomPiece(): Piece {
  return Math.random() < 0.5 ? 'O' : 'X';
}
