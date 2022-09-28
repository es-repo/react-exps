export type Piece = 'O' | 'X';

export interface Coord {
  x: number;
  y: number;
}

export interface Move {
  coord: Coord;
}

export type Grid = (Piece | null)[][];

export interface Player {
  id: string;
  piece: Piece;
}

export interface GameResult {
  wonPlayer: Player | null;
  winLine: Coord[] | null;
}

export interface GameState {
  player1: Player;
  player2: Player;
  nextPlayer: Player | null;
  grid: Grid;
  result: GameResult | null;
}

export default function isGameOver(gameState: GameState): boolean {
  return gameState.result != null;
}
