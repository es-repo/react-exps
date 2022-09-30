import { canMakeMove, GameState } from './gameState';
import nextMove, { NextMoveAction } from './reducers/nextMove';
import undoPrevMove, { UndoPrevMoveAction } from './reducers/undoPrevMove';

export type GameActionType = 'nextMove' | 'undoPrevMove';

export interface GameAction {
  type: GameActionType;
}

export type GameReducer = (gameState: GameState, action: GameAction) => GameState;

export function createGameReducer(sameInLineCount: number): GameReducer {
  return function gameReducer(gameState: GameState, action: GameAction): GameState {
    if (isNextMoveAction(action)) {
      if (canMakeMove(gameState, action.payload.move)) {
        const nextState = nextMove(gameState, action.payload.move, sameInLineCount);
        if (action.payload.onMoveDone != null) {
          action.payload.onMoveDone(nextState, action.payload.move);
        }
        return nextState;
      } else {
        return gameState;
      }
    }

    if (isUndoPrevMoveAction(action)) {
      return undoPrevMove(gameState);
    }

    throw new Error('Not implemented.');
  };
}

function isNextMoveAction(action: GameAction): action is NextMoveAction {
  return action.type == 'nextMove';
}

function isUndoPrevMoveAction(action: GameAction): action is UndoPrevMoveAction {
  return action.type == 'undoPrevMove';
}
