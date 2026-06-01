import React from 'react';
import styles from './toast.module.css';

interface ToastProps {
  text: string;
  isVisible: boolean;
}

export const ToastNotification: React.FC<ToastProps> = ({ text, isVisible }) => {
  return isVisible ? (
    <div className={styles.toast}>{text}</div>
  ) : null;
};