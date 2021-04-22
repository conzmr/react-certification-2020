import React from 'react';

const ToggleButton = ({onClick, selected, selectedIcon, icon, className}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="toogle-button"
      className={`h-8 w-8 flex justify-center items-center focus:outline-none ${className}`}
    >
      {selected ? selectedIcon : icon}
    </button>
  );
};

export default ToggleButton;
