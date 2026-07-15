'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useState } from 'react';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { Modal } from '@/shared/ui/Modal';

export const Header = () => {

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleOpenRegister = () => {
    setIsRegisterModalOpen(true)
  }
  const handleCloseRegister = () => {
    setIsRegisterModalOpen(false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Uzor
            </Link>
          </Typography>
          <Link href="/catalog" passHref>
            <Button color="inherit">этоя</Button>
          </Link>
          <Link href="/login" passHref>
            <Button color="inherit">Вход</Button>
          </Link>
          <Button color='inherit' onClick={handleOpenRegister}>
            регать
          </Button>
        </Toolbar>
      </AppBar>

      <Modal isOpen={isRegisterModalOpen} onClose={handleCloseRegister}>
        <RegisterForm onSuccess={handleCloseRegister} />
      </Modal>
    </Box>
  );
};
