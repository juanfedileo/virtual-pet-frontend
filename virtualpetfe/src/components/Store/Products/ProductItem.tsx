import * as React from "react";
import { useState } from "react";
import { Card, CardMedia, Typography, Button, Box, IconButton, Snackbar, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from "../../../contexts/CartContext";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ id, name, price, image }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id, name, price, image, quantity: 1 });
    }
    
    // Show animated checkmark
    setShowCheckmark(true);
    setSnackbar({ open: true, message: `${quantity} ${quantity === 1 ? 'artículo agregado' : 'artículos agregados'} al carrito` });
    
    // Reset state
    setTimeout(() => setShowCheckmark(false), 1500);
    setQuantity(1);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0, 94, 151, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(4, 119, 190, 0.2)',
          transform: 'translateY(-4px)',
        },
        position: 'relative',
      }}
    >
      {/* Animated Checkmark Overlay */}
      {showCheckmark && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 94, 151, 0.9)',
            borderRadius: '12px',
            zIndex: 10,
            animation: 'fadeInOut 1.5s ease-in-out',
            '@keyframes fadeInOut': {
              '0%': { opacity: 0 },
              '20%': { opacity: 1 },
              '80%': { opacity: 1 },
              '100%': { opacity: 0 },
            },
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: '64px',
              color: '#FFFFFF',
              animation: 'scaleCheck 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              '@keyframes scaleCheck': {
                '0%': { transform: 'scale(0)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          />
        </Box>
      )}
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{ objectFit: 'cover', backgroundColor: '#f0f0f0' }}
      />

      {/* Product Info */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#005E97', mb: 0.5 }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ color: '#005E97', fontWeight: 'bold' }}>
          ${price.toFixed(2)}
        </Typography>
      </Box>

      {/* Bottom Section: Quantity Controls + Add to Cart */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderTop: '1px solid #E6E8EE',
        }}
      >
        {/* Quantity Controls (Left) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            backgroundColor: '#F1F3FA',
            borderRadius: '24px',
            p: 0.5,
          }}
        >
          <IconButton
            size="small"
            onClick={handleDecrement}
            sx={{
              color: '#005E97',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              '&:hover': { backgroundColor: '#E6E8EE' },
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              minWidth: '20px',
              textAlign: 'center',
              fontWeight: 600,
              color: '#005E97',
            }}
          >
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={handleIncrement}
            sx={{
              color: '#005E97',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              '&:hover': { backgroundColor: '#E6E8EE' },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Add to Cart Button (Right) */}
        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            background: 'linear-gradient(135deg, #005E97 0%, #0477BE 100%)',
            color: '#FFFFFF',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '10px',
            padding: '10px',
            '&:hover': { boxShadow: '0 4px 12px rgba(4, 119, 190, 0.3)' },
          }}
        >
          Comprar
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProductItem;