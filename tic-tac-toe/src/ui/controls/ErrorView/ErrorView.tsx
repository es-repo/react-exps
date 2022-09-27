import React from 'react';
import styles from './styles.module.css';

export interface ErrorViewProps {
  text: string;
}

export default function ErrorView(props: ErrorViewProps) {
  return props.text.length > 0 ? <div className={styles.ErrorMessage}>{props.text}</div> : null;
}
