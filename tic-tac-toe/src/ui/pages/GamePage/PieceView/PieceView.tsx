import classNames from 'classnames';
import React from 'react';
import { Piece } from '../../../../model/game';
import styles from './styles.module.css';

export interface PieceViewProps {
  piece: Piece | null;
}

export default function PieceView(props: PieceViewProps) {
  switch (props.piece) {
    case 'O':
      return PieceOView();
    case 'X':
      return PieceXView();
    default:
      return null;
  }
}

function PieceOView() {
  return <div className={styles.PieceOView}></div>;
}

function PieceXView() {
  return (
    <div className={styles.PieceXView}>
      <div className={classNames(styles.PieceXViewStick, styles.PieceXViewStick1)}></div>
      <div className={classNames(styles.PieceXViewStick, styles.PieceXViewStick2)}></div>
    </div>
  );
}
