import classNames from 'classnames';
import React from 'react';
import { Piece } from '../../../../../model/game/piece';
import styles from './styles.module.css';

export interface PieceViewProps {
  piece: Piece | null;
  isWin: boolean;
}

export default function PieceView(props: PieceViewProps) {
  switch (props.piece) {
    case 'O':
      return PieceOView(props.isWin);
    case 'X':
      return PieceXView(props.isWin);
    default:
      return null;
  }
}

function PieceOView(isWin: boolean) {
  return <div className={classNames(styles.PieceOView, isWin && styles.isWin)}></div>;
}

function PieceXView(isWin: boolean) {
  return (
    <div className={classNames(styles.PieceXView, isWin && styles.isWin)}>
      <div className={classNames(styles.PieceXViewStick, styles.PieceXViewStick1)}></div>
      <div className={classNames(styles.PieceXViewStick, styles.PieceXViewStick2)}></div>
    </div>
  );
}
