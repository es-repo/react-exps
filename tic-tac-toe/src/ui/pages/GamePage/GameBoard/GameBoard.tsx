import React, { useState } from 'react';
import { Game, GameState, Move } from '../../../../model/game';
import GameResult from './GameResult/gameResult';
import GridView from './GridView/GridView';
import PlayerView from './PlayerView/PlayerView';
import styles from './styles.module.css';

export interface GameBoardProps {
  game: Game;
  onGameOver: () => void;
}

export default function GameBoard(props: GameBoardProps) {
  const [gameState, setGameState] = useState<GameState>(props.game.getState());

  const onGridViewClick = (x: number, y: number) => {
    const move: Move = { x, y };
    props.game.nextMove(move);
    setGameState(props.game.getState());

    if (props.game.isGameOver()) {
      props.onGameOver();
    }
  };

  const onUndo = () => {
    props.game.undoPrevMove();
    setGameState(props.game.getState());
  };

  return (
    <div className={styles.GameBoard}>
      <div className={styles.playersPanel}>
        <PlayerView player={gameState.player1} isNext={gameState.nextPlayer == gameState.player1} />
        <GameResult isGameOver={props.game.isGameOver()} wonPlayer={props.game.getState().result?.wonPlayer ?? null} />
        <PlayerView player={gameState.player2} isNext={gameState.nextPlayer == gameState.player2} />
      </div>
      <GridView grid={gameState.grid} onClick={onGridViewClick} />
    </div>
  );
}
