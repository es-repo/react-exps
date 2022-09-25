import React from 'react';
import styles from './styles.module.css';

export default function LoadingIndicator() {
  return (
    <div className={styles['lds-default']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
