import * as React from "react";
import { Box, TextField, Button, Typography, Link as MuiLink, InputAdornment, IconButton, Alert, CircularProgress } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loginUser, storeTokens } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const PENDING_CHECKOUT = 'pending_checkout';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<{ username?: string; password?: string }>({});
  const [generalError, setGeneralError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { setUser, setAccessToken, setRole } = useAuth();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username || username.trim().length === 0) {
      newErrors.username = "Username is required";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setGeneralError('');
    try {
      const response = await loginUser({
        username,
        password,
      });

      // Store tokens
      storeTokens(response);

      // Persist role in sessionStorage and update AuthContext
      if (response.user?.role) {
        sessionStorage.setItem('session_role', response.user.role);
        setRole(response.user.role);
      }

      // Update AuthContext with user and token
      setUser(response.user);
      setAccessToken(response.access);

      // Clear form
      setUsername('');
      setPassword('');
      setErrors({});

      // Check if there's a pending checkout
      const pendingCheckout = sessionStorage.getItem(PENDING_CHECKOUT);
      if (pendingCheckout) {
        // Redirect to cart to trigger auto-checkout
        navigate('/cart');
      } else {
        // Navigate to home
        navigate('/');
      }
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: Record<string, string[]> };
      if (error.errors && typeof error.errors === 'object') {
        // Backend validation errors
        const backendErrors: Record<string, string> = {};
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (field === 'username' || field === 'password') {
            backendErrors[field] = Array.isArray(messages) ? messages[0] : String(messages);
          }
        });
        if (Object.keys(backendErrors).length > 0) {
          setErrors(backendErrors);
        } else {
          setGeneralError(error.message || 'Login failed. Please try again.');
        }
      } else {
        setGeneralError(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '95vh', p: 2, background: 'linear-gradient(135deg, #F8F9FF 0%, #EBF0FA 100%)' }}>
      <Box sx={{ width: '100%', maxWidth: 480, backgroundColor: '#FFFFFF', p: 4, borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 94, 151, 0.1)' }}>
        <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/')} color="primary" sx={{ color: '#005E97' }} disabled={isLoading}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom sx={{ ml: 1, fontWeight: 'bold', color: '#005E97' }}>Login</Typography>
          </Box>

          {/* General Error Alert */}
          {generalError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setGeneralError('')}>
              {generalError}
            </Alert>
          )}
            
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.username}
              helperText={errors.username}
              disabled={isLoading}
            />
            
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end" disabled={isLoading}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={isLoading}
              sx={{ 
                mb: 2, 
                background: 'linear-gradient(135deg, #005E97 0%, #0477BE 100%)', 
                py: 1.3, 
                fontWeight: 600, 
                textTransform: 'none', 
                '&:hover': { boxShadow: '0 4px 12px rgba(4, 119, 190, 0.3)' },
                position: 'relative'
              }}
            >
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-12px',
                  }}
                />
              )}
              <span style={{ opacity: isLoading ? 0 : 1 }}>
                Login
              </span>
            </Button>
            
            <Typography sx={{ mt: 3, color: '#404751' }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register" sx={{ color: '#005E97', fontWeight: 600, '&:hover': { color: '#003555' } }}>Register</MuiLink>
            </Typography>
          </Box>
      </Box>
    </Box>
  );
};

export default Login;
