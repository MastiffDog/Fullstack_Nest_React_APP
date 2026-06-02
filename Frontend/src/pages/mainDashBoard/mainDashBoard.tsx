import React, { useEffect, useState, useCallback } from 'react';
import WorkService from 'src/features/services/workService';
import WorkForm from 'src/features/workForm/workForm';
import { WorkListPanelComponent } from 'src/features/components/workListPanel/workListPanel';
import { WorksTableComponent } from 'src/features/components/worksTable/worksTable';
import { ConfirmModalWindow } from 'src/features/components/confirmModal/confirmModal';
import { Work } from 'src/entities/work/workModel';
import { ICreateWork } from 'src/features/workForm/workForm';
import { ToastNotification } from 'src/shared/toast';
import styles from './mainDashBoard.module.css';

interface SortSettings {
  column: string;
  direction: 'asc' | 'desc';
}

export const MainDashBoard: React.FC = () => {
  const [addFormIsVisible, setFormVisibility] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [formId, setFormID] = useState<number>();
  const [formInitialData, setFormData] = useState<ICreateWork>();
  const [isConfirmVisible, handleConfirmVisibility] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortSettings, setSortSettings] = useState<SortSettings | null> (null);
  const [toastIsVisible, setToastVisibility] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const refreshData = async () => { 
    try {
      const data = await WorkService.getAllWorks();
      setWorks(data);
    }
    catch(e) {
      alert("Произошла ошибка при загрузке данных.")
    }
  }

  const handleWorkSelection = useCallback((workId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds(prev => [...prev, workId]);
    } else {
      setSelectedIds(prev => prev.filter(id => id !== workId));
    }
  },[setSelectedIds]);

  const editExistedWork = useCallback((work: Work) => {
    setFormID(work.id);
    setFormData({
      executor: work.executor,
      dimension_type: work.dimension_type,
      dimension_value: work.dimension_value,
      work: work.work,
      date: work.date
    });
    setFormVisibility(true);
  },[]);

  const handleDeleteSelectedWorks = useCallback(async () => {
    if(selectedIds.length === 1) {
      try {
        await WorkService.deleteWork(selectedIds[0]);
        refreshData();
      }
      catch(e) {
        alert("Произошла ошибка при удалении записи. Посмотрите консоль.")
      }
    }
    
    else if (selectedIds.length>1) {
       try {
        await WorkService.deleteMany(selectedIds);
        refreshData();
      }
      catch(e) {
        alert("Произошла ошибка при удалении записей. Посмотрите консоль.")
      } 
    }
    handleConfirmVisibility(false);
  }, [selectedIds, refreshData, handleConfirmVisibility]);
 
  const handleCloseWorkForm = () => {
    setFormData({
      executor: '',
      dimension_type: '',
      dimension_value: 0,
      work: '',
      date: ''
    });
    refreshData();
    setFormVisibility(false);
  }
  
  const handleSort = (column: string) => {
    if (column !== 'date') {
      return; 
    }
      
    setSortSettings((prev) => {
        if (!prev) {
          return { column, direction: 'asc' };
        }
        
        return {
          ...prev, // Копируем все из предыдущего состояния (в т.ч. 'column')
          direction: prev.direction === 'asc' ? 'desc' : 'asc' // Меняем направление
        };
      });  
  };

  useEffect(()=>{refreshData()},[]);

  useEffect(()=>{
    if(!sortSettings) return;
    if(sortSettings.direction === "asc") {
      const sortedWorks = [...works].sort((workA, workB) => {
        return workB.date.localeCompare(workA.date);
      });
      setWorks(sortedWorks);
    }
    if(sortSettings.direction === "desc") {
      const sortedWorks = [...works].sort((workA, workB) => {
        return workA.date.localeCompare(workB.date);
      });
      setWorks(sortedWorks);
    }
  },[sortSettings])

  const handleFormMessage = (message: string) => {
    setToastMessage(message);
    setToastVisibility(true);
      setTimeout(()=>{
        setToastVisibility(false);
        setToastMessage('');
      }, 5000);
  }

  return (
    <main className={styles.main}>
        <WorkListPanelComponent
          refreshWorks={refreshData}
          addWork={useCallback(()=>setFormVisibility(true), [setFormVisibility])}
          removeSelectedWorks={()=>handleConfirmVisibility(true)}
        />
        <WorksTableComponent
          works={works}
          sortSettings={sortSettings}
          handleSort={handleSort}
          onWorkSelect={handleWorkSelection} 
          editExistedWork={editExistedWork}
        />

        {isConfirmVisible ? 
          <ConfirmModalWindow
            onCancel={()=>handleConfirmVisibility(false)}
            onProceed={()=>handleDeleteSelectedWorks()}
          /> 
        : null}

        {addFormIsVisible ? 
        <WorkForm
          onClose={handleCloseWorkForm}
          id={formId}
          initialData={formInitialData}
          setMessage={handleFormMessage}
        /> : null}

        <ToastNotification
          isVisible={toastIsVisible}
          text={toastMessage}
        />    
    </main>
  );
};