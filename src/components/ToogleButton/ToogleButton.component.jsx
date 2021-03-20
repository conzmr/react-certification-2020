import React from 'react';
import { IconButton } from '@material-ui/core';

function ToggleButton({ selectedIcon, icon, selected, onClick }) {
  return (
    <IconButton selected={selected} onClick={onClick}>
      {selected ? selectedIcon : icon}
    </IconButton>
  );
}

export default ToggleButton;
