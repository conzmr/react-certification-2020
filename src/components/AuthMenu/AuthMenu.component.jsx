import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useAuth } from '../../providers/Auth';

function AuthMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const { authenticated, logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/');
  }

  const menuId = 'user-menu';

  return authenticated ? (
    <>
      <IconButton
        edge="end"
        aria-label="Current user account menu"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={deAuthenticate}>Logout</MenuItem>
      </Menu>
    </>
  ) : (
    <Link to="/login">Log in</Link>
  );
}

export default AuthMenu;
