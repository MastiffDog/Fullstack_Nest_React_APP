import React from 'react';
import styles from './progressbar.module.css'; 

export interface IProgressBarProps {
  progress: number; 
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ progress }) => {
  return (
    <div className={styles.progress_bar}>
      <div>
        <span>Загрузка...</span>
      </div>
      <div>
        <progress max="100" value={progress}>
          {progress}%
        </progress>
      </div>
    </div>
  );
};