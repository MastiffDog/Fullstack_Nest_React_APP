import React from 'react';
import styles from './removeSelectedButton.module.css';

interface ButtonProps {
  onClick?: () => void;
}

export const RemoveSelectedButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.main} onClick={onClick}>
      <span className={styles.label}>Удалить выбранные работы</span>
    </button>
  );
};