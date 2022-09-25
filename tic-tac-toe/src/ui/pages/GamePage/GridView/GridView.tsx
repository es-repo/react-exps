import React from 'react';
import { Grid } from '../../../../model/game';
import PieceView from './PieceView/PieceView';
import styles from './styles.module.css';

export interface GridViewProps {
  grid: Grid;
}

export default function GridView(props: GridViewProps) {
  return (
    <div className={styles.GridView}>
      {props.grid.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((piece, j) => (
            <div key={j} className={styles.cell}>
              <PieceView piece={piece} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
