import React, { useReducer } from 'react';
import { GameReducer } from '../../../../model/game/gameReducer';
import isGameOver, { GameState } from '../../../../model/game/gameState';
import { NextMoveAction } from '../../../../model/game/reducers/nextMove';
import { UndoPrevMoveAction } from '../../../../model/game/reducers/undoPrevMove';
import GameResult from './GameResult/gameResult';
import GridView from './GridView/GridView';
import PlayerView from './PlayerView/PlayerView';
import styles from './styles.module.css';

export interface GameBoardProps {
  initialGameState: GameState;
  gameReducer: GameReducer;
  onGameOver: () => void;
}

export default function GameBoard(props: GameBoardProps) {
  const [gameState, gameDispatch] = useReducer(props.gameReducer, props.initialGameState);

  const onGridViewClick = (x: number, y: number) => {
    const moveNextAction: NextMoveAction = { type: 'nextMove', move: { coord: { x, y } } };
    gameDispatch(moveNextAction);
  };

  if (isGameOver(gameState)) {
    props.onGameOver();
  }

  const onUndoPrevMove = () => {
    const undoPrevMoveAction: UndoPrevMoveAction = { type: 'undoPrevMove' };
    gameDispatch(undoPrevMoveAction);
  };

  return (
    <div className={styles.GameBoard}>
      <div className={styles.playersPanel}>
        <PlayerView player={gameState.player1} isNext={gameState.nextPlayer == gameState.player1} />
        <GameResult isGameOver={isGameOver(gameState)} wonPlayer={gameState.result?.wonPlayer ?? null} />
        <PlayerView player={gameState.player2} isNext={gameState.nextPlayer == gameState.player2} />
      </div>
      <GridView grid={gameState.grid} winLine={gameState.result?.winLine ?? null} onClick={onGridViewClick} />
    </div>
  );
}
