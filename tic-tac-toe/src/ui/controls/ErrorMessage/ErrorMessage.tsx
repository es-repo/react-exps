import React from 'react';
import styles from './styles.module.css';

export interface ErrorMessageProps {
  text: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return props.text.length > 0 ? <div className={styles.ErrorMessage}>{props.text}</div> : null;
}
