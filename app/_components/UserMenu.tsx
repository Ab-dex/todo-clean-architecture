"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: "hsl(217.2 32.6% 17.5%)" }}>👤</Avatar>
      </Button>
      <Menu
        id="signout-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'button',
        }}
        sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#1e293b',
            },
          }}
      >
        <MenuItem onClick={handleClose} sx={{fontSize: '0.8rem'}}>Sign Out</MenuItem>
        
      </Menu>
    </>
  );
}