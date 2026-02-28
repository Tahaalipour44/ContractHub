// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Login() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePhone = (phone) => {
    const regex = /^(\+98|0)?9\d{9}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validatePhone(formData.phoneNumber)) {
      setError('Please enter a valid Iranian phone number');
      return;
    }

    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, #1a2a2a 0%, #0a0f0f 100%)',
        position: 'relative',
      }}
    >
      {/* انیمیشن background */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 50%)',
          animation: 'rotate 20s linear infinite',
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }} />

      <Paper
        elevation={24}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: '450px',
          mx: 2,
          background: 'rgba(20, 26, 26, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          borderRadius: 4,
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
            animation: 'slide 3s ease-in-out infinite',
          },
          '@keyframes slide': {
            '0%': { left: '-100%' },
            '50%': { left: '100%' },
            '100%': { left: '100%' },
          },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: '0 8px 30px rgba(0, 255, 136, 0.4)',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': { boxShadow: '0 8px 30px rgba(0, 255, 136, 0.4)' },
                '50%': { boxShadow: '0 8px 50px rgba(0, 255, 136, 0.8)' },
                '100%': { boxShadow: '0 8px 30px rgba(0, 255, 136, 0.4)' },
              },
            }}
          >
            <TaskAltIcon sx={{ fontSize: 40, color: '#000' }} />
          </Box>
          
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontSize: '2.5rem'
            }}
          >
            Welcome Back
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Login with your phone number
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-icon': { color: '#ff3e3e' }
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            placeholder="09123456789"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: '#00ff88' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#00ff88' }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              mt: 4,
              mb: 2,
              py: 1.8,
              fontSize: '1.2rem',
              fontWeight: 700,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Login'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ 
                  color: '#00ff88',
                  textDecoration: 'none',
                  fontWeight: 600,
                  borderBottom: '2px solid #00ff88',
                  paddingBottom: '2px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = '#4dffaa'}
                onMouseLeave={(e) => e.target.style.color = '#00ff88'}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}