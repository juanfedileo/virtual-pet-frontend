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
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // Form data
  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Errors state
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const steps = ['Personal Info', 'Address & Contact', 'Account'];

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be at least 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSubmit = () => {
    // Mock registration: store user in localStorage
    localStorage.setItem('user', JSON.stringify({
      name: formData.name,
      surname: formData.surname,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
    }));
    alert('Registered (mock)');
    setFormData({
      name: '',
      surname: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setActiveStep(0);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        {/** back button + title */}
        {(() => {
          const navigate = useNavigate();
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={() => navigate('/')} color="primary">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" gutterBottom sx={{ ml: 1, fontWeight: 'bold' }}>
                Register
              </Typography>
            </Box>
          );
        })()}

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
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Surname"
              value={formData.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              fullWidth
              error={!!errors.surname}
              helperText={errors.surname}
            />
          </Box>
        )}

        {/* Step 2: Address & Contact */}
        {activeStep === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
              multiline
              rows={3}
            />
            <TextField
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="Enter at least 10 digits"
            />
          </Box>
        )}

        {/* Step 3: Account */}
        {activeStep === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
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
              label="Confirm Password"
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
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
          >
            {activeStep === 2 ? 'Register' : 'Next'}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <MuiLink component={Link} to="/login">Login</MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
