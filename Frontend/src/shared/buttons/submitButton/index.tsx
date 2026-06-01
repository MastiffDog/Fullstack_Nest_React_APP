import React from 'react';

interface ButtonProps {
  width?: string;
  height?: string;
  radius?: number;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  label?: string;
  onClick?: () => void;
  disabled?: boolean
}

const StyledButton: React.FC<ButtonProps> = ({
  width = 'auto',
  height = '40px',
  radius = 4,
  backgroundColor = '#007bff',
  fontFamily = 'Arial',
  fontSize = '16px',
  fontWeight = 'bold',
  color = '#fff',
  label = '',
  onClick,
  disabled
}) => {
  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: `${radius}px`,
    backgroundColor,
    fontFamily,
    fontSize,
    fontWeight,
    color,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    width,
    height,
  };

  return (
    <button
      type="submit"
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default StyledButton;