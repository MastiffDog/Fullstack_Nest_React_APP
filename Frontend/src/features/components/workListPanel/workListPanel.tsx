import React from 'react';
import { ButtonWithIcon } from 'src/shared/buttons/iconButton';
import { AddButton } from 'src/shared/buttons/addButton';
import refresh from '../../../shared/icons/refresh.svg';
import styles from './worklistpanel.module.css';
import { RemoveSelectedButton } from 'src/shared/buttons/removeSelectedButton';

export interface IWorkListPanelProps {
  refreshWorks?: () => void;
  addWork?: () => void;
  removeSelectedWorks?: () => void;
}

export const WorkListPanelComponent: React.FC<IWorkListPanelProps> = ({
  refreshWorks,
  addWork,
  removeSelectedWorks
}) => {
  return (
    <div className={styles.title_container}>
      <div className={styles.title}>
        <span>Журнал выполненных работ</span>
      </div>
      <div className={styles.refresh}>
        <ButtonWithIcon
          iconSrc={refresh}
          onClick={refreshWorks}
        />
      </div>
      <div className={styles.add}>
        <AddButton
          onClick={addWork}
        />
      </div>
      <div className={styles.remove}>
        <RemoveSelectedButton
          onClick={removeSelectedWorks}
        />
      </div>
    </div>
  );
};