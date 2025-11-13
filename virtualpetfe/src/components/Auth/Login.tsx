import * as React from "react";
import { Box, TextField, Button, Typography, Link as MuiLink, InputAdornment, IconButton } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // simple mock auth: store user in localStorage
    localStorage.setItem('user', JSON.stringify({ email }));
    alert('Logged in (mock)');
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate('/')} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom sx={{ ml: 1, fontWeight: 'bold' }}>Login</Typography>
          </Box>
            
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.email}
              helperText={errors.email}
              type="email"
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
              Login
            </Button>
            
            <Typography sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register">Register</MuiLink>
            </Typography>
          </Box>
      </Box>
    </Box>
  );
};

export default Login;
