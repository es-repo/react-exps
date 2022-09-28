import { GameAction } from '../gameReducer';
import { Coord, GameState, Grid, Move } from '../gameState';
import { Piece } from '../piece';

export interface NextMoveAction extends GameAction {
  move: Move;
}

export default function nextMove(game: GameState, move: Move, sameInLineCount: number): GameState {
  if (game.result != null || game.nextPlayer == null) {
    return game;
  }

  if (game.grid[move.coord.x][move.coord.y] != null) {
    return game;
  }

  const nextGame = JSON.parse(JSON.stringify(game)) as GameState;

  if (nextGame.nextPlayer != null) {
    nextGame.grid[move.coord.x][move.coord.y] = nextGame.nextPlayer.piece;
  }

  nextGame.nextPlayer =
    nextGame.nextPlayer!.accountId == nextGame.player1.accountId ? nextGame.player2 : nextGame.player1;

  const winLine = findLine(nextGame.grid, game.nextPlayer.piece, sameInLineCount);
  if (winLine != null) {
    nextGame.result = { wonPlayer: game.nextPlayer, winLine };
    nextGame.nextPlayer = null;
  }

  if (gridIsFull(nextGame.grid)) {
    nextGame.result = { wonPlayer: null, winLine: null };
    nextGame.nextPlayer = null;
  }

  return nextGame;
}

function findLine(grid: Grid, piece: Piece, requiredCount: number): Coord[] | null {
  return (
    findLineInRows(grid, piece, requiredCount) ??
    findLineInColumns(grid, piece, requiredCount) ??
    findLineInDiagonals(grid, piece, requiredCount)
  );
}

function findLineInRows(grid: Grid, piece: Piece, requiredCount: number): Coord[] | null {
  for (let i = 0; i < grid.length; i++) {
    const line: Coord[] = [];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == piece) {
        line.push({ x: i, y: j });
      } else {
        line.length = 0;
      }

      if (line.length == requiredCount) {
        return line;
      }
    }
  }

  return null;
}

function findLineInColumns(grid: Grid, piece: Piece, requiredCount: number): Coord[] | null {
  for (let j = 0; j < grid.length; j++) {
    const line: Coord[] = [];
    for (let i = 0; i < grid[0].length; i++) {
      if (grid[i][j] == piece) {
        line.push({ x: i, y: j });
      } else {
        line.length = 0;
      }

      if (line.length == requiredCount) {
        return line;
      }
    }
  }

  return null;
}

function findLineInDiagonals(grid: Grid, piece: Piece, requiredCount: number): Coord[] | null {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const line: Coord[] = [];
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
          line.push({ x, y });
        } else {
          line.length = 0;
        }

        if (line.length == requiredCount) {
          return line;
        }
      }

      line.length = 0;
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
          line.push({ x, y });
        } else {
          line.length = 0;
        }

        if (line.length == requiredCount) {
          return line;
        }
      }
    }
  }

  return null;
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
