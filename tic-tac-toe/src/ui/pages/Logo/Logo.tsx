import React from 'react';
import styles from './styles.module.css';
import classnames from 'classnames';

export default function Logo() {
  return (
    <div className={styles.Logo}>
      <div className={classnames(styles.object, styles.object1)}>Tic</div>-
      <div className={classnames(styles.object, styles.object2)}>Tac</div>-
      <div className={classnames(styles.object, styles.object3)}>Toe</div>
    </div>
  );
}
