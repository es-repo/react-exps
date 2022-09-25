import classNames from 'classnames';
import React from 'react';
import { Piece } from '../../../../../model/game';
import styles from './styles.module.css';

export interface PieceViewProps {
  piece: Piece | null;
}

export default function PieceView(props: PieceViewProps) {
  const pieceClassName = props.piece == 'O' ? styles.o : props.piece == 'X' ? styles.x : null;

  return <div className={classNames(styles.PieceView, pieceClassName)}>{props.piece}</div>;
}
