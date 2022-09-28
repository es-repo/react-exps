import React from 'react';
import classNames from 'classnames';
import PieceView from '../PieceView/PieceView';
import styles from './styles.module.css';
import { Coord, Grid } from '../../../../../model/game/gameState';

export interface GridViewProps {
  grid: Grid;
  winLine: Coord[] | null;
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
              <PieceView piece={piece} isWin={isCellOnLine(i, j, props.winLine)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function isCellOnLine(cellX: number, cellY: number, line: Coord[] | null): boolean {
  if (line == null) {
    return false;
  }

  for (const coord of line) {
    if (cellX == coord.x && cellY == coord.y) {
      return true;
    }
  }

  return false;
}
