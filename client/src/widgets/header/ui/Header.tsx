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
import { LoginForm } from '@/features/auth/ui/LoginForm';

export const Header = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenRegister = () => {
    setIsRegisterModalOpen(true);
  };
  const handleCloseRegister = () => {
    setIsRegisterModalOpen(false);
  };
  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };
  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  const HandleLogout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

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

          {!user ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button color="inherit" onClick={handleOpenLogin}>
                Вход
              </Button>
              <Button color="inherit" onClick={handleOpenRegister}>
                Зарегистрироваться
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={HandleLogout}>
              Выход
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Modal isOpen={isRegisterModalOpen} onClose={handleCloseRegister}>
        <RegisterForm onSuccess={handleCloseRegister} />
      </Modal>

      <Modal isOpen={isLoginModalOpen} onClose={handleCloseLogin}>
        <LoginForm onSuccess={handleCloseLogin} />
      </Modal>
    </Box>
  );
};
