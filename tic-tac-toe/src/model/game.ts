import { create2dArray } from '../utils/array-utils';

export type Piece = 'O' | 'X';

export interface Move {
  x: number;
  y: number;
}

export type Grid = (Piece | null)[][];

export interface Player {
  id: string;
  piece: Piece;
}

export interface Game {
  player1: Player;
  player2: Player;
  sameInRowCount: number;
  grid: Grid;
  wonPlayer: Player | null;
  isGameOver: () => boolean;
  makeMove: (move: Move) => boolean;
}

export function createGame(size: number, sameInRowCount: number, player1Id: string, player2Id: string): Game {
  const grid = create2dArray<Piece | null>(size, 'O');

  grid[0][0] = 'X';
  grid[1][1] = 'X';
  grid[2][2] = 'X';

  const player1Piece: Piece = Math.random() < 0.5 ? 'O' : 'X';
  const player2Piece: Piece = player1Piece == 'O' ? 'X' : 'O';

  const player1: Player = { id: player1Id, piece: player1Piece };
  const player2: Player = { id: player2Id, piece: player2Piece };

  let currentPlayer: Player = player1;

  let wonPlayer: Player | null = null;

  function isGameOver(): boolean {
    return wonPlayer != null || gridIsFull(grid);
  }

  function makeMove(move: Move): boolean {
    if (isGameOver()) {
      return false;
    }

    grid[move.x][move.y] = currentPlayer.piece;

    if (hasSamePiecesInRow(grid, currentPlayer.piece, sameInRowCount)) {
      wonPlayer = currentPlayer;
    }

    currentPlayer = currentPlayer == player1 ? player2 : player1;

    return !isGameOver();
  }

  return {
    player1,
    player2,
    sameInRowCount,
    grid,
    wonPlayer,
    isGameOver,
    makeMove
  };
}

function gridIsFull(grid: Grid): boolean {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == null) {
        return false;
      }
    }
  }

  return true;
}

function hasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  return (
    rowHasSamePiecesInRow(grid, piece, requiredCount) ||
    columnHasSamePiecesInRow(grid, piece, requiredCount) ||
    upToDownDiagonalHasSamePiecesInRow(grid, piece, requiredCount) ||
    downToUpDiagonalHasSamePiecesInRow(grid, piece, requiredCount)
  );
}

function rowHasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == piece) {
        count++;
      } else {
        count = 0;
      }

      if (count == requiredCount) {
        return true;
      }
    }
  }

  return false;
}

function columnHasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  let count = 0;

  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      if (grid[i][j] == piece) {
        count++;
      } else {
        count = 0;
      }

      if (count == requiredCount) {
        return true;
      }
    }
  }

  return false;
}

function upToDownDiagonalHasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  // TODO:

  return false;
}

function downToUpDiagonalHasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  // TODO:

  return false;
}
