import classNames from 'classnames';
import styles from './styles.module.css';
import React from 'react';

export interface SizeMenuItemProps {
  size: number;
  onClick: (size: number) => void;
}

export default function SizeMenuItem(props: SizeMenuItemProps) {
  return (
    <button onClick={() => props.onClick(props.size)} className={classNames('button-inverse', styles.MenuItem)}>
      {props.size} x {props.size}
    </button>
  );
}
