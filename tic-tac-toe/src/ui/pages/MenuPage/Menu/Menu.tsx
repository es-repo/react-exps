import React from 'react';
import SizeMenuItem from './SizeMenuItem/SizeMenuItem';
import styles from './styles.module.css';

export interface MenuProps {
  sizes: number[];
  onGameSizeSelected: (size: number) => void;
}

export default function Menu(props: MenuProps) {
  return (
    <div className={styles.Menu}>
      <h1>Select size</h1>
      <nav className={styles.MenuItems}>
        {props.sizes.map(size => (
          <SizeMenuItem size={size} key={size} onClick={props.onGameSizeSelected} />
        ))}
      </nav>
    </div>
  );
}
