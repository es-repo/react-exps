import { GameState } from './gameState';
import nextMove, { NextMoveAction } from './reducers/nextMove';
import undoPrevMove from './reducers/undoPrevMove';

export type GameActionType = 'nextMove' | 'undoPrevMove';

export interface GameAction {
  type: GameActionType;
}

export type GameReducer = (gameState: GameState, action: GameAction) => GameState;

export function createGameReducer(sameInLineCount: number): GameReducer {
  return function gameReducer(gameState: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'nextMove':
        return nextMove(gameState, (action as NextMoveAction).payload.move, sameInLineCount);
      case 'undoPrevMove':
        return undoPrevMove(gameState);
      default:
        throw new Error();
    }
  };
}
