import classNames from 'classnames';
import React from 'react';
import { Player } from '../../../../../model/game/player';
import PieceView from '../PieceView/PieceView';
import styles from './styles.module.css';

export interface PlayerViewProps {
  player: Player;
  isNext: boolean;
}

export default function PlayerView(props: PlayerViewProps) {
  return (
    <div className={classNames(styles.PlayerView, props.isNext ? styles.isNext : null)}>
      <div className={styles.pieceViewContainer}>
        <PieceView piece={props.player.piece} isWin={false} />
      </div>
      <div className={styles.accountName}>{props.player.accountEmail}</div>
    </div>
  );
}
