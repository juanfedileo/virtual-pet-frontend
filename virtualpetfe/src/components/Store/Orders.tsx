import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mockOrders = [
  {
    id: 1001,
    items: [
      { name: 'Dog Food - 5kg', qty: 1, price: 29.99 },
      { name: 'Chew Toy', qty: 2, price: 9.99 },
    ],
    status: 'Shipped',
    total: 49.97,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1002,
    items: [{ name: 'Cat Bed', qty: 1, price: 39.99 }],
    status: 'Processing',
    total: 39.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1003,
    items: [
      { name: 'Vaccine', qty: 1, price: 19.99 },
      { name: 'Medication', qty: 1, price: 14.99 },
    ],
    status: 'Delivered',
    total: 34.98,
    createdAt: new Date().toISOString(),
  },
];

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || 'null');
    if (stored && Array.isArray(stored) && stored.length > 0) setOrders(stored);
    else setOrders(mockOrders);
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2 }}>
            Orders
          </Typography>
        </Box>

        <Card sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          <CardContent>
            <Stack spacing={2}>
              {orders.map((o) => (
                <Card key={o.id} variant="outlined" sx={{ position: 'relative' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6">Order #{o.id}</Typography>
                        <Typography variant="caption" color="text.secondary">{new Date(o.createdAt).toLocaleString()}</Typography>
                      </Box>
                      <Chip label={o.status} color={o.status === 'Delivered' ? 'success' : o.status === 'Shipped' ? 'primary' : 'warning'} sx={{ ml: 1 }} />
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Stack spacing={0.5}>
                      {o.items?.map((it: any, idx: number) => (
                        <Typography key={idx} variant="body2">
                          {it.name} x{it.qty} — ${(it.price * it.qty).toFixed(2)}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>${o.total.toFixed(2)}</Typography>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Orders;
