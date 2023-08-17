import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Grid, TextField, Paper, Typography } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { z } from 'zod';
import axios from 'axios';

const registerSchema = z.object({
  first_name: z.string().nonempty('Nom is required'),
  last_name: z.string().nonempty('Prénom is required'),
  username: z.string().nonempty('Username is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
});

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [title] = useState('Create a New Staff Account!');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({ email: '', password: '' });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("Test inside front page")
    try {
      registerSchema.parse(formData);

      // Check if password and confirmPassword match
      if (formData.password !== formData.confirmPassword) {
        setErrors({ ...errors, password: 'Passwords do not match' });
        return;
      }

      // Update your register function to handle file upload (you'll need to modify this on your server side too)
      const response = await axios.post('http://127.0.0.1:8000/api/token/register/', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      toast.success('User registered successfully');
      console.log('Registration successful:', response.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailError = error.issues.find((issue) => issue.path[0] === 'email');
        const passwordError = error.issues.find((issue) => issue.path[0] === 'password');
        setErrors({
          email: emailError ? emailError.message : '',
          password: passwordError ? passwordError.message : '',
        });
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <ToastContainer />
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            {title}
          </Typography>
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Nom"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Prénom"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth variant="outlined" color="primary" type="submit">
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined" onClick={resetForm}>
                  Reset
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="text" onClick={() => router.push('/auth/login')}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}