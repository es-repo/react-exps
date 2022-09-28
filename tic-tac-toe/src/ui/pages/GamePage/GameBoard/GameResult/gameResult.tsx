import React from 'react';
import { Player } from '../../../../../model/game/gameState';
import PieceView from '../PieceView/PieceView';
import styles from './styles.module.css';

export interface GameResultProps {
  wonPlayer: Player | null;
  isGameOver: boolean;
}

export default function GameResult(props: GameResultProps) {
  if (!props.isGameOver) {
    return null;
  }

  return (
    <div className={styles.GameResult}>
      {props.wonPlayer != null ? (
        <>
          <div className={styles.pieceViewContainer}>
            <PieceView piece={props.wonPlayer.piece} isWin={false} />
          </div>
          <h2>Won!</h2>
        </>
      ) : (
        <h2>Draw!</h2>
      )}
    </div>
  );
}
