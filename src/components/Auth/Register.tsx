import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { registerUser, storeTokens } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const PENDING_CHECKOUT = 'pending_checkout';

const Register: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [generalError, setGeneralError] = React.useState('');
  const navigate = useNavigate();
  const { setUser, setAccessToken, setRole } = useAuth();

  // Form data
  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    address: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Errors state
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const steps = ['Información Personal', 'Dirección y Contacto', 'Cuenta'];

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.surname.trim()) newErrors.surname = 'El apellido es requerido';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.phone.trim()) newErrors.phone = 'El número de teléfono es requerido';
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'El teléfono debe tener al menos 10 dígitos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username || !formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (activeStep === 0) isValid = validateStep1();
    else if (activeStep === 1) isValid = validateStep2();
    else if (activeStep === 2) isValid = validateStep3();

    if (isValid) {
      if (activeStep === 2) {
        handleSubmit();
      } else {
        setActiveStep((prev) => prev + 1);
        setErrors({});
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setGeneralError('');
    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'cliente',
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
      setFormData({
        name: '',
        surname: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
      setActiveStep(0);

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
      if (error.errors) {
        // Backend validation errors
        const backendErrors: Record<string, string> = {};
        Object.entries(error.errors).forEach(([field, messages]) => {
          backendErrors[field] = Array.isArray(messages) ? messages[0] : String(messages);
        });
        setErrors(backendErrors);
      }
      setGeneralError(error.message || 'El registro falló. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '95vh', p: 2, background: 'linear-gradient(135deg, #F8F9FF 0%, #EBF0FA 100%)' }}>
      <Box sx={{ width: '100%', maxWidth: 600, backgroundColor: '#FFFFFF', p: 4, borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 94, 151, 0.1)' }}>
        {/** back button + title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate('/')} color="primary" sx={{ color: '#005E97' }} disabled={isLoading}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom sx={{ ml: 1, fontWeight: 'bold', color: '#005E97' }}>
            Registrarse
          </Typography>
        </Box>

        {/* General Error Alert */}
        {generalError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setGeneralError('')}>
            {generalError}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Personal Info */}
        {activeStep === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Apellido"
              value={formData.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              fullWidth
              error={!!errors.surname}
              helperText={errors.surname}
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>
        )}

        {/* Step 2: Address & Contact */}
        {activeStep === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Dirección"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="Número de Teléfono"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="Ingresa al menos 10 dígitos"
            />
          </Box>
        )}

        {/* Step 3: Account */}
        {activeStep === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              type="text"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirmar Contraseña"
              type={showConfirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 4 }}>
          <Button
            disabled={activeStep === 0 || isLoading}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={isLoading}
            sx={{ position: 'relative' }}
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
              {activeStep === 2 ? 'Register' : 'Next'}
            </span>
          </Button>
        </Box>

        <Typography sx={{ mt: 3, textAlign: 'center' }}>
          ¿Ya tienes una cuenta?{' '}
          <MuiLink component={Link} to="/login">Iniciar sesión</MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
