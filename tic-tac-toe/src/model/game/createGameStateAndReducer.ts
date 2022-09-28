import { create2dArray } from '../../utils/array-utils';
import { createGameReducer, GameReducer } from './gameReducer';
import { GameState, Piece, Player } from './gameState';

export const sameInLineCounts: Record<number, number> = {
  [3]: 3,
  [5]: 4,
  [10]: 5,
  [20]: 5
};

export default function createGameStateAndReducer(
  size: number,
  player1Id: string,
  player2Id: string
): [GameState, GameReducer] {
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
