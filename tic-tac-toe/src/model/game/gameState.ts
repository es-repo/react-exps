import { Piece } from './piece';
import { Player } from './player';

export interface Coord {
  x: number;
  y: number;
}

export interface Move {
  player: Player;
  coord: Coord;
}

export type Grid = (Piece | null)[][];

export interface GameResult {
  wonPlayer: Player | null;
  winLine: Coord[] | null;
}

export interface GameState {
  player1: Player;
  player2: Player;
  nextPlayer: Player | null;
  grid: Grid;
  moves: Move[];
  result: GameResult | null;
}

export default function isGameOver(gameState: GameState): boolean {
  return gameState.result != null;
}

export function canMakeMove(gameState: GameState, move: Move): boolean {
  if (gameState.result != null || gameState.nextPlayer == null) {
    return false;
  }

  if (gameState.grid[move.coord.x][move.coord.y] != null) {
    return false;
  }

  if (gameState.nextPlayer.accountId != move.player.accountId) {
    return false;
  }

  return true;
}
