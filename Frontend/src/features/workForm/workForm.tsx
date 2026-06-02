import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import WorkService from 'src/features/services/workService';
import styles from './workForm.module.css';
import { CustomButton } from 'src/shared/buttons/customButton';

export interface ICreateWork {
  executor: string;
  dimension_type: string;
  dimension_value: number;
  work: string;
  date: string; // Формат ГГГГ-ММ-ДД
}

interface AddWorkFormProps {
  onClose: () => void;
  setMessage: (message: string) => void;
  initialData?: ICreateWork;
  id?: number;
}

const WorkValidationSchema = Yup.object({
  executor: Yup.string()
    .min(3, 'Слишком коротко! Минимум 3 символа.')
    .max(50, 'Слишком длинное имя!')
    .required('Обязательное поле'),
  dimension_type: Yup.string()
    .oneOf(['шт', 'кг', 'м2', 'м3', 'м.п', 'тн'], 'Допустимые значения: шт, м.п, кг, тн, м2, м3')
    .required('Обязательное поле'),
  dimension_value: Yup.number()
    .positive('Значение должно быть положительным')
    .moreThan(0, 'Должно быть больше нуля')
    .required('Обязательное поле'),
  work: Yup.string()
    .min(5, 'Минимум 5 символов')
    .required('Обязательное поле'),
  date: Yup.date()
    .required('Выберите дату')
    .typeError('Введите корректную дату в формате ГГГГ-ММ-ДД'),
});

const WorkForm: React.FC<AddWorkFormProps> = ({ onClose, setMessage, initialData, id }) => {
  const [formMode, setFormMode] = useState("new");
  
  useEffect(() => {
    if (initialData && id !== undefined) {
      setFormMode("change");
    } else {
      setFormMode("new");
    }
  }, [initialData, id]); // <-- Зависимости эффекта

  const initialValues : ICreateWork = initialData || {
    executor: '',
    dimension_type: 'м2',
    dimension_value: 0,
    work: '',
    date: ''
  }

  const formTitle = initialData ? "Редактировать вид работ" : "Добавить новый вид работ";

  return (
    <div className={styles.main}>
      <div className={styles.content}>
      <h2>{formTitle}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={WorkValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            onClose();
            if(formMode === "new") {
              await WorkService.createWork(values);
              setMessage('Запись успешно добавлена!')
            }
            if(formMode === "change" && id) {
              await WorkService.updateWork(id,values);
              setMessage('Запись успешно изменена!')
            }
            resetForm(); 
          } catch (error) {
            console.error("Ошибка при отправке:", error);
            setMessage("Не удалось добавить запись. Проверьте консоль.")
          } finally {
            onClose();
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form>
            {/* Поле Исполнитель */}
            <div className={styles.formSection}>
              <label htmlFor="executor" style={{ display: 'block', fontWeight: 'bold', marginBottom: '.5rem' }}>Исполнитель:</label>
              <Field
                type="text"
                id="executor"
                name="executor"
                className={styles.input_field}
              />
              <ErrorMessage name="executor" component="div" className={styles.error_message} />
            </div>

            {/* Поле Тип измерения */}
            <div className={styles.formSection}>
              <label htmlFor="dimension_type" style={{ display: 'block', fontWeight: 'bold', marginBottom: '.5rem' }}>Тип измерения:</label>
              <Field className={styles.input_field} as="select" id="dimension_type" name="dimension_type">
                <option value="м2">Площадь (м2)</option>
                <option value="м3">Объем (м3)</option>
                <option value="м.п">Длина (м.п)</option>
                <option value="шт">Количество (шт)</option>
                <option value="тн">Вес (тн)</option>
                <option value="кг">Вес (кг)</option>
              </Field>
              <ErrorMessage name="dimension_type" component="div" className={styles.error_message} />
            </div>

            {/* Поле Значение измерения */}
            <div className={styles.formSection}>
              <label htmlFor="dimension_value" style={{ display: 'block', fontWeight: 'bold', marginBottom: '.5rem' }}>Значение:</label>
              <Field className={styles.input_field} type="number" id="dimension_value" name="dimension_value" step="any" />
              <ErrorMessage name="dimension_value" component="div" className={styles.error_message} />
            </div>

            {/* Поле Вид работы */}
            <div className={styles.formSection}>
              <label htmlFor="work" style={{ display: 'block', fontWeight: 'bold', marginBottom: '.5rem' }}>Вид работы:</label>
              <Field className={styles.input_field} type="text" id="work" name="work" />
              <ErrorMessage name="work" component="div" className={styles.error_message} />
            </div>

            {/* Поле Дата */}
            <div className={styles.formSection}>
              <label htmlFor="date" style={{ display: 'block', fontWeight: 'bold', marginBottom: '.5rem' }}>Дата:</label>
              <Field className={styles.input_field} type="date" id="date" name="date" />
              <ErrorMessage name="date" component="div" className={styles.error_message} />
            </div>

            {/* Кнопка отправки */}
            <div className={styles.buttons}>
             <button 
              className={styles.submit}
              type="submit"
              disabled={isSubmitting}
              style={{
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              Добавить работу
            </button>

            <CustomButton
              onClick={()=>onClose()}
              name='Отмена'
              color='primary'
            />  
            </div>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default WorkForm;