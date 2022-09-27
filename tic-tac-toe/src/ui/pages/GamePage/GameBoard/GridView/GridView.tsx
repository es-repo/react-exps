import classNames from 'classnames';
import React from 'react';
import { Grid } from '../../../../../model/game';
import PieceView from '../PieceView/PieceView';
import styles from './styles.module.css';

export interface GridViewProps {
  grid: Grid;
  onClick: (x: number, y: number) => void;
}

export default function GridView(props: GridViewProps) {
  return (
    <div className={styles.GridView}>
      {props.grid.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((piece, j) => (
            <div
              key={j}
              className={classNames(styles.cell, piece == null ? styles.cellEmpty : null)}
              onClick={() => props.onClick(i, j)}>
              <PieceView piece={piece} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
