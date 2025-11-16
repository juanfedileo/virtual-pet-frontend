import * as React from "react";
import { useState } from "react";
import { Card, CardMedia, Typography, Button, Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id, name, price, image, quantity: 1 });
    }
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
      }}
    >
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
            borderRadius: '6px',
            '&:hover': { boxShadow: '0 4px 12px rgba(4, 119, 190, 0.3)' },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductItem;