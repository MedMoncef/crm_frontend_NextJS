import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, ListItemButton } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');

  const handleRegisterUserClick = () => {
    router.push('/auth/register');
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/auth/login');
  };

  const handleProfileClick = () => {
    router.push(`/Tables/Users/pofileID`);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundImage: "url('/background.jpg')", marginBottom: '5%' }}>
        <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, animation: 'fadeIn 0.5s forwards', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
            <span style={{ fontWeight: 700, fontSize: '24px' }}>CRM</span>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <Typography sx={{ color: 'white', marginRight: 2 }}>{role}</Typography>
                <ListItemButton>
                  <Button variant="text" color="inherit" onClick={handleProfileClick} sx={{ textTransform: 'none' }}>
                    {fullName}
                  </Button>
                  <Button variant="text" color="inherit" onClick={handleLogoutClick} sx={{ marginLeft: 2, textTransform: 'none' }} startIcon={<LockOutlinedIcon />}>
                    Logout
                  </Button>
                </ListItemButton>
              </>
            ) : (
              <>
                <Button variant="text" color="inherit" onClick={handleLoginClick} sx={{ marginLeft: 2, textTransform: 'none' }} startIcon={<LockOutlinedIcon />}>
                  Login
                </Button>
                <Button variant="text" color="inherit" onClick={handleRegisterUserClick} sx={{ marginLeft: 2, textTransform: 'none' }} startIcon={<AppRegistrationIcon />}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;