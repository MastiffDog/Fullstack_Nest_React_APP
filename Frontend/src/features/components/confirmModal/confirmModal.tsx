import React from 'react';
import styles from './confirmModal.module.css';
import { CustomButton } from 'src/shared/buttons/customButton';

interface IConfirmModal {
  onCancel: () => void;
  onProceed: () => void;
}

export const ConfirmModalWindow: React.FC<IConfirmModal> = ({ onCancel, onProceed }) => {
  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.text}>
          <span>Подтверждаете удаление?</span>
        </div>
      
        <div className={styles.buttons_container}>
          <CustomButton
            onClick={() => onProceed()}
            name="Удалить"
            color="danger"
          />
          <CustomButton
            onClick={() => onCancel()}
            name="Отмена"
            color="success"
          />
        </div>
      </div>
    </div>
  );
};