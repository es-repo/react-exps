import React, { useEffect, useReducer } from 'react';
import { GameReducer } from '../../../../model/game/gameReducer';
import isGameOver, { GameResult, GameState, Move } from '../../../../model/game/gameState';
import { Player } from '../../../../model/game/player';
import { canMakeMove, NextMoveAction } from '../../../../model/game/reducers/nextMove';
import { UndoPrevMoveAction } from '../../../../model/game/reducers/undoPrevMove';
import GameResultView from './GameResultView/gameResultView';
import GridView from './GridView/GridView';
import PlayerView from './PlayerView/PlayerView';
import styles from './styles.module.css';

export interface GameBoardProps {
  initialGameState: GameState;
  receivedMoves: Move[];
  gameReducer: GameReducer;
  player: Player;
  onNextMove: (move: Move) => void;
  onGameOver: (result: GameResult) => void;
}

export default function GameBoard(props: GameBoardProps) {
  const [gameState, gameDispatch] = useReducer(props.gameReducer, props.initialGameState);

  useEffect(() => {
    for (const move of props.receivedMoves) {
      const moveNextAction: NextMoveAction = {
        type: 'nextMove',
        move
      };

      gameDispatch(moveNextAction);
    }
  }, [props.receivedMoves]);

  const onGridViewClick = (x: number, y: number) => {
    const move: Move = { player: props.player, coord: { x, y } };

    if (!canMakeMove(gameState, move)) {
      return;
    }

    const moveNextAction: NextMoveAction = {
      type: 'nextMove',
      move
    };
    gameDispatch(moveNextAction);

    props.onNextMove(move);
  };

  if (isGameOver(gameState)) {
    props.onGameOver(gameState.result!);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onUndoPrevMove = () => {
    const undoPrevMoveAction: UndoPrevMoveAction = { type: 'undoPrevMove' };
    gameDispatch(undoPrevMoveAction);
  };

  return (
    <div className={styles.GameBoard}>
      <div className={styles.playersPanel}>
        <PlayerView player={gameState.player1} isNext={gameState.nextPlayer == gameState.player1} />
        <GameResultView isGameOver={isGameOver(gameState)} wonPlayer={gameState.result?.wonPlayer ?? null} />
        <PlayerView player={gameState.player2} isNext={gameState.nextPlayer == gameState.player2} />
      </div>
      <GridView grid={gameState.grid} winLine={gameState.result?.winLine ?? null} onClick={onGridViewClick} />
    </div>
  );
}
