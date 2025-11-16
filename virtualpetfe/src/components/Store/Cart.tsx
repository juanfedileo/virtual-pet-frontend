import React from "react";
import { useCart } from "../../contexts/CartContext";
import { Box, Typography, IconButton, Button, Card, CardContent, CardActions, Divider, Stack, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAccessToken, getClientId } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const PENDING_CHECKOUT = 'pending_checkout';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, removeFromCart, clearCart, total } = useCart();

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'error' });

  const performCheckout = async (clientId: number, token: string) => {
    if (!clientId || !token) {
      setSnackbar({ open: true, message: 'Credenciales de autenticación faltantes. Por favor, inicia sesión de nuevo.', severity: 'error' });
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    const productIds = cart.map((it) => it.id);

    const body = {
      client: clientId,
      employee: null,
      products: productIds,
      status: 'pending',
    };

    setIsCheckingOut(true);
    try {
      const res = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to create order: ${res.status} ${errText}`);
      }

      const data = await res.json();
      console.log('Order created', data);
      // Clear cart and redirect to orders
      clearCart();
      navigate('/orders');
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      setSnackbar({ open: true, message: 'Error al realizar el pedido. Por favor, intenta de nuevo.', severity: 'error' });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const checkout = () => {
    const clientId = getClientId();
    const token = getAccessToken();

    console.log('Checkout clicked - isAuthenticated:', isAuthenticated, 'clientId:', clientId, 'token:', token);

    // If not authenticated, redirect to login and mark checkout as pending
    if (!isAuthenticated || !clientId || !token) {
      console.log('Not authenticated, setting pending_checkout flag and redirecting to login');
      sessionStorage.setItem(PENDING_CHECKOUT, 'true');
      console.log('Set sessionStorage pending_checkout:', sessionStorage.getItem(PENDING_CHECKOUT));
      navigate('/login');
      return;
    }

    // Perform checkout immediately
    performCheckout(clientId, token);
  };

  // Auto-checkout after successful login/register
  React.useEffect(() => {
    const pendingCheckout = sessionStorage.getItem(PENDING_CHECKOUT);
    console.log('Auto-checkout effect triggered - isAuthenticated:', isAuthenticated, 'pending_checkout:', pendingCheckout);
    if (pendingCheckout && isAuthenticated) {
      console.log('Removing pending_checkout flag and performing auto-checkout');
      sessionStorage.removeItem(PENDING_CHECKOUT);
      const clientId = getClientId();
      const token = getAccessToken();
      console.log('Auto-checkout clientId:', clientId, 'token exists:', !!token);
      if (clientId && token) {
        performCheckout(clientId, token);
      }
    }
  }, [isAuthenticated]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary" sx={{ color: '#005E97' }}>
            <ArrowBackIcon />
          </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2, color: '#005E97' }}>
            Carrito
          </Typography>
        </Box>

        {cart.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#404751', mb: 2 }}>
              Tu carrito está vacío
            </Typography>
            <Typography variant="body2" sx={{ color: '#707882', mb: 4 }}>
              ¡Agrega algunos artículos del catálogo para comenzar!
            </Typography>
          </Box>
        ) : (
          <Card sx={{ maxHeight: '70vh', overflow: 'auto' }}>
            <CardContent>
              <Stack spacing={2}>
                {cart.map((it) => (
                  <Card key={it.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6">{it.name}</Typography>
                          <Typography variant="body2" color="text.secondary">Cantidad: {it.quantity}</Typography>
                        </Box>
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(it.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="subtitle1">${(it.price * it.quantity).toFixed(2)}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Box>
                <Button variant="outlined" color="secondary" onClick={clearCart}>Limpiar</Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Typography>
                <Button variant="contained" color="primary" onClick={checkout} disabled={isCheckingOut} sx={{ position: 'relative' }}>
                  {isCheckingOut && (
                    <CircularProgress size={20} sx={{ position: 'absolute', left: '12px' }} />
                  )}
                  <span style={{ opacity: isCheckingOut ? 0.6 : 1 }}>{isCheckingOut ? 'Realizando pedido...' : 'Finalizar compra'}</span>
                </Button>
              </Box>
            </CardActions>
          </Card>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/catalog')}
            sx={{
              background: 'linear-gradient(135deg, #005E97 0%, #0477BE 100%)',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Seguir Comprando
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Cart;
