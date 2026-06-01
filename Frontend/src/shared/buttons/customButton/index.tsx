import React from 'react';
import { ButtonColor, ButtonProps } from './Button.types';
import styles from './custombutton.module.css';

/**
 * Универсальная кастомная кнопка с использованием CSS Modules.
 */
export const CustomButton: React.FC<ButtonProps> = ({ onClick, name, color = 'primary' }) => {
    // Базовый класс всегда один и тот же
    const baseClass = styles.custom_button; 

    // 2. Динамически формируем имя класса для цвета.
    //    Объект `styles` содержит все классы из файла CSS как свои свойства.
    //    Например, если в CSS есть класс .button--primary, то в объекте styles
    //    будет свойство styles['button--primary'] или styles.button__button__primary__v... (зависит от настройки).
    //    Мы конструируем строку 'button--${color}' и используем её для доступа к нужному свойству.
    const colorClass = styles[`custom_button--${color}`]; 

    return (
        <button
            className={`${baseClass} ${colorClass}`} // 3. Передаем значения из объекта styles
            onClick={onClick}
        >
            {name}
        </button>
    );
};