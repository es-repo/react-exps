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

const sameInLineCounts: Record<number, number> = {
  [3]: 3,
  [5]: 4,
  [10]: 5,
  [20]: 5
};

export interface GameState {
  player1: Player;
  player2: Player;
  nextPlayer: Player | null;
  grid: Grid;
  result: GameResult | null;
}

export interface GameResult {
  wonPlayer: Player | null;
}

export function createGame(size: number, player1Id: string, player2Id: string): [GameState, GameReducer] {
  const grid = create2dArray<Piece | null>(size, null);

  const player1Piece: Piece = Math.random() < 0.5 ? 'O' : 'X';
  const player2Piece: Piece = player1Piece == 'O' ? 'X' : 'O';

  const player1: Player = { id: player1Id, piece: player1Piece };
  const player2: Player = { id: player2Id, piece: player2Piece };

  const nextPlayer: Player = player1Piece == 'X' ? player1 : player2;

  const state: GameState = {
    player1,
    player2,
    nextPlayer,
    grid,
    result: null
  };

  const reducer = createGameReducer(sameInLineCounts[size]);

  return [state, reducer];
}

function nextMove(game: GameState, move: Move, sameInLineCount: number): GameState {
  if (game.result != null || game.nextPlayer == null) {
    return game;
  }

  if (game.grid[move.x][move.y] != null) {
    return game;
  }

  const nextGame = JSON.parse(JSON.stringify(game)) as GameState;

  nextGame.grid[move.x][move.y] = nextGame.nextPlayer!.piece;

  nextGame.nextPlayer = nextGame.nextPlayer!.id == nextGame.player1.id ? nextGame.player2 : nextGame.player1;

  if (hasSamePiecesInRow(nextGame.grid, game.nextPlayer.piece, sameInLineCount)) {
    nextGame.result = { wonPlayer: game.nextPlayer };
    nextGame.nextPlayer = null;
  }

  if (gridIsFull(nextGame.grid)) {
    nextGame.result = { wonPlayer: null };
    nextGame.nextPlayer = null;
  }

  return nextGame;
}

function undoPrevMove(game: GameState): GameState {
  return game;
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
    diagonalHasSamePiecesInRow(grid, piece, requiredCount)
  );
}

function rowHasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  for (let i = 0; i < grid.length; i++) {
    let count = 0;
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
  for (let j = 0; j < grid.length; j++) {
    let count = 0;
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

function diagonalHasSamePiecesInRow(grid: Grid, piece: Piece, requiredCount: number): boolean {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let count = 0;
      for (let k = 0; k < requiredCount; k++) {
        const x = i + k;
        if (x >= grid.length) {
          break;
        }

        const y = j + k;
        if (j >= grid[i].length) {
          break;
        }

        if (grid[x][y] == piece) {
          count++;
        } else {
          count = 0;
        }

        if (count == requiredCount) {
          return true;
        }
      }

      count = 0;
      for (let k = 0; k < requiredCount; k++) {
        const x = i + k;
        if (x >= grid.length) {
          break;
        }

        const y = j - k;
        if (j < 0) {
          break;
        }

        if (grid[x][y] == piece) {
          count++;
        } else {
          count = 0;
        }

        if (count == requiredCount) {
          return true;
        }
      }
    }
  }

  return false;
}

export type GameActionType = 'nextMove' | 'undoPrevMove';

export interface GameAction {
  type: GameActionType;
}

export interface NextMoveAction extends GameAction {
  move: Move;
}

export type UndoPrevMoveAction = GameAction;

export type GameReducer = (gameState: GameState, action: GameAction) => GameState;

export function createGameReducer(sameInLineCount: number): GameReducer {
  return function gameReducer(gameState: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'nextMove':
        return nextMove(gameState, (action as NextMoveAction).move, sameInLineCount);
      case 'undoPrevMove':
        return undoPrevMove(gameState);
      default:
        throw new Error();
    }
  };
}
