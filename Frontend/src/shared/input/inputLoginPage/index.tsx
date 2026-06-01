import * as React from 'react';
import { useState, useEffect } from 'react';
import user from '../../icons/user.svg'
import lock from '../../icons/lock.svg';
import close from '../../icons/close.svg';
import eye from '../../icons/eye-off.svg';
import styles from './inputstyles.module.css';

enum FieldType {
  LOGIN = 'LOGIN',
  PASSWORD = 'PASSWORD'
}

interface InputFieldProps {
  fieldType: FieldType;
  length?: number;
  height?: number;
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  labelWeight?: string;
  labelFamily?: string;
  labelSpacing?: number;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  fieldType,
  length = 200,
  height = 30,
  borderWidth = 1,
  borderColor = "#ccc",
  borderRadius = 0,
  textColor = "#333",
  fontSize = "16px",
  fontFamily = "Arial",
  placeholder = "",
  value,
  onChange,
  onClick,
  label,
  labelColor = "#333",
  labelSize = "14px",
  labelWeight = "normal",
  labelFamily = "Arial",
  labelSpacing = "40px",
}) => {
  const inputStyles = {
    width: `${length}px`,
    height: `${height}px`,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    color: textColor,
    fontSize,
    fontFamily,
  };

  const labelStyles = {
    fontSize: `${labelSize}px`,
    fontWeight: labelWeight,
    fontFamily: labelFamily,
    color: labelColor,
    marginBottom: `${labelSpacing}px`,
    display: 'block',
  };

  const [showPassword, setVisibility] = useState(false);

  useEffect(() => {
    if (fieldType === FieldType.LOGIN) {
      setVisibility(true);
    }
  }, []);

  return (
    <div className={styles.input_group}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}

      {fieldType === FieldType.LOGIN &&
        <img
          src={user}
          alt=""
          className={styles.input_icon_left}
        />
      }

      {fieldType === FieldType.PASSWORD &&
        <img
          src={lock}
          alt=""
          className={styles.input_icon_left}
        />
      }

      {fieldType === FieldType.LOGIN &&
        <button
          onClick={onClick}
          className={styles.input_icon_btn_close}
        >
          <img
            src={close}
            alt=""
          />
        </button>
      }

      {fieldType === FieldType.PASSWORD &&
        <button
          onClick={() => setVisibility(!showPassword)}
          className={styles.input_icon_btn_eye}
        >
          <img
            src={eye}
            alt=""
          />
        </button>
      }

      <input
        type={showPassword ? 'text' : 'password'}
        className={styles.input_with_icons}
        style={inputStyles}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event)}
      />
    </div>
  );
};

export default InputField;