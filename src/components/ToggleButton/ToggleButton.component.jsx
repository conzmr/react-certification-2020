import React from 'react';

const ToggleButton = ({ selectedIcon, icon, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 w-8 flex justify-center items-center focus:outline-none text-blue-500 dark:text-yellow-500"
    >
      {selected ? selectedIcon : icon}
    </button>
  );
};

export default ToggleButton;
