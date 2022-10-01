import React from 'react';
import { Player } from '../../../../../model/game/player';
import PieceView from '../PieceView/PieceView';
import styles from './styles.module.css';

export interface GameResultViewProps {
  wonPlayer: Player | null;
  isGameOver: boolean;
}

export default function GameResultView(props: GameResultViewProps) {
  if (!props.isGameOver) {
    return null;
  }

  return (
    <div className={styles.GameResultView}>
      {props.wonPlayer != null ? (
        <>
          <div className={styles.pieceViewContainer}>
            <PieceView piece={props.wonPlayer.piece} isWin={false} />
          </div>
          <h2 className={styles.won}>Won!</h2>
        </>
      ) : (
        <h2>Draw!</h2>
      )}
    </div>
  );
}
