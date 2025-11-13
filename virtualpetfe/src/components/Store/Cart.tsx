import React from "react";
import { useCart } from "../../contexts/CartContext";
import { Box, Typography, IconButton, Button, Card, CardContent, CardActions, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, total } = useCart();

  const checkout = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({ id: Date.now(), items: cartToUse, total: totalToUse, createdAt: new Date().toISOString() });
    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart();
    alert('Order placed (mock).');
  };

  const mockCart = [
    { id: 1, name: 'Dog Food - 5kg', price: 29.99, image: '', quantity: 1 },
    { id: 2, name: 'Cat Toy', price: 9.99, image: '', quantity: 2 },
    { id: 3, name: 'Bird Cage', price: 59.99, image: '', quantity: 1 },
  ];

  const cartToUse = cart.length > 0 ? cart : mockCart;
  const totalToUse = cart.length > 0 ? total : cartToUse.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2 }}>
            Cart
          </Typography>
        </Box>

        <Card sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          <CardContent>
            <Stack spacing={2}>
              {cartToUse.length === 0 ? (
                <Typography>No items in cart.</Typography>
              ) : (
                cartToUse.map((it) => (
                  <Card key={it.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6">{it.name}</Typography>
                          <Typography variant="body2" color="text.secondary">Qty: {it.quantity}</Typography>
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
                ))
              )}
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Box>
              <Button variant="outlined" color="secondary" onClick={clearCart}>Clear</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${totalToUse.toFixed(2)}</Typography>
              <Button variant="contained" color="primary" onClick={checkout}>Checkout</Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Cart;
