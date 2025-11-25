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
  description: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ id, name, price, image, description }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string }>({ open: false, message: '' });


  // 2. NUEVO . Estado para manejar el giro de la tarjeta
  const [isFlipped, setIsFlipped] = useState(false);


  
  // 3. CAMBIO: Detener la propagación del clic en los botones
  //    Esto es CRUCIAL para que al hacer clic en un botón no se gire la tarjeta.
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation(); // <-- NUEVO
    setQuantity((q) => q + 1);
  };


  
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation(); // <-- NUEVO
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // <-- NUEVO


    addToCart({ id, name, price, image, quantity: quantity }); //📌 Cuidado, chequear esto
    
    // Show animated checkmark
    setShowCheckmark(true);
    setSnackbar({ open: true, message: `${quantity} ${quantity === 1 ? 'artículo agregado' : 'artículos agregados'} al carrito` });
    
    // Reset state
    setTimeout(() => setShowCheckmark(false), 1500);
    setQuantity(1);
  };


  // 4. NUEVO: Función para girar la tarjeta
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };


  return (
    <> {/* Usamos un Fragment para que el Snackbar no se vea afectado por el giro */}
    <Card
      onClick={handleCardClick} // 5. CAMBIO: Añadir el 'onClick' principal
      
      sx={{
          height: '100%',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 94, 151, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(4, 119, 190, 0.2)',
            transform: 'translateY(-4px)',
          },
          // 6. NUEVO: Estilos para la perspectiva 3D
          perspective: '1000px',
          cursor: 'pointer',
          position: 'relative', // Necesario para el overlay (ya estaba)
        }}
    >
    
    {/* 7. NUEVO: Contenedor 'flipper' que aplica la rotación */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* 8. CARA FRONTAL (Contenido original de la tarjeta) */}
          <Box
            sx={{
              //position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden', // Oculta esta cara cuando está girada
              display: 'flex',
              flexDirection: 'column',
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
                      '0%': { transform: 'scale(0)' }, '100%': { transform: 'scale(1)' },
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
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  mb: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {description}
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
      </Box>

      {/* 9. CARA TRASERA (Contenido de la descripción) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,   // <-- AÑADE ESTA LÍNEA
              left: 0,  // <-- AÑADE ESTA LÍNEA
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden', // Oculta esta cara cuando está al frente
              transform: 'rotateY(180deg)', // Gira la cara trasera para que se lea bien
              backgroundColor: '#005E97', // Color de fondo de la cara trasera
              color: '#FFFFFF',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              p: 3,
              boxSizing: 'border-box', // Asegura que el padding no rompa el layout
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, overflowY: 'auto' }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Card>

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
    </>
  );
};

export default ProductItem;