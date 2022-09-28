import { GameAction } from '../gameReducer';
import { GameState } from '../gameState';

export type UndoPrevMoveAction = GameAction;

export default function undoPrevMove(game: GameState): GameState {
  return game;
}
