import { GameAction } from '../gameReducer';
import { GameState } from '../gameState';

export type UndoPrevMoveAction = GameAction;

export function createUndoPrevMoveAction(): UndoPrevMoveAction {
  return { type: 'nextMove' };
}

export default function undoPrevMove(game: GameState): GameState {
  return game;
}
