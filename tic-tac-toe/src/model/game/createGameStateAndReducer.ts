import { create2dArray } from '../../utils/array-utils';
import { createGameReducer, GameReducer } from './gameReducer';
import { GameState } from './gameState';
import { Piece } from './piece';
import { Player } from './player';

export const sameInLineCounts: Record<number, number> = {
  [3]: 3,
  [5]: 4,
  [10]: 5,
  [20]: 5
};

export default function createGameStateAndReducer(
  size: number,
  player1: Player,
  player2: Player
): [GameState, GameReducer] {
  const grid = create2dArray<Piece | null>(size, null);

  const nextPlayer: Player = player1.piece == 'X' ? player1 : player2;

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
