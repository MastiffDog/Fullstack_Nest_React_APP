import React, { useCallback } from 'react';
import { Work } from 'src/entities/work/workModel';
import styles from './workstable.module.css';
import { CustomButton } from 'src/shared/buttons/customButton';

export interface IWorksTableProps {
  works: Work[];
  sortSettings: { column: string; direction: 'asc' | 'desc' } | null;
  handleSort: (column: string) => void;
  onWorkSelect: (workId: number, isChecked: boolean) => void;
  editExistedWork: (workId: Work) => void;
}

export const WorksTableComponent: React.FC<IWorksTableProps> = ({
  works,
  sortSettings,
  handleSort,
  onWorkSelect,
  editExistedWork,
}) => {
    const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, workId: number) => {
      // event.target.checked содержит новое состояние галочки
      onWorkSelect(workId, event.target.checked);
    },
    [onWorkSelect] // Зависимость от внешней функции
  );

  // Вспомогательная функция для определения, нужно ли показывать стрелку
  const isSortedByDate = sortSettings?.column === 'date';

  console.log("sortSettings", sortSettings);

  return (
    <table className={styles.table}>
      <thead className={styles.table_head}>
        <tr>
          <th className={styles.table_check}>
          </th>
          {/* Заголовки без сортировки */}
          <th className={styles.table_head_line_left}>Исполнитель</th>
          <th className={styles.table_head_line}>Наименование работ</th>
          <th className={styles.table_head_line}>Ед.изм</th>
          <th className={styles.table_head_line}>Объем</th>

          {/* Заголовок с сортировкой только по дате */}
          <th
            className={styles.table_head_line}
            onClick={() => handleSort('date')} // Только эта колонка вызывает сортировку
            style={{ cursor: 'pointer' }}
          >
            Дата
            {isSortedByDate && (
              <span>
                {sortSettings.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>

          <th></th>

          <th className={styles.table_head_line}></th>
        </tr>
      </thead>
      <tbody>
        {works.map((work) => (
          <tr className={styles.table_row} key={work.id}>
            <td className={`${styles.table_check} ${styles.table_row_line}`}>
              <input 
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, work.id)} 
              />
            </td>
            <td className={styles.table_row_line_left}>{work.executor}</td>
            <td className={styles.table_row_line}>{work.work ?? '-'}</td>
            <td className={styles.table_row_line}>{work.dimension_type ?? '-'}</td>
            <td className={styles.table_row_line}>{work.dimension_value ?? '-'}</td>
            <td className={styles.table_row_line}>{work.date ?? '-'}</td>
            <td className={styles.table_row_line}>
              <div className={styles.table_mock_buttons}></div>
            </td>
            <td className={styles.table_row_line}>
              <CustomButton
                name="Редактировать"
                color='primary'
                onClick={()=>editExistedWork(work)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};