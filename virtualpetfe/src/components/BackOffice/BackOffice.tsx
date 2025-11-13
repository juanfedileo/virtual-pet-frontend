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
  Button,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mockAllOrders = [
  {
    id: 1001,
    client: 'John Doe',
    email: 'john@example.com',
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
    client: 'Jane Smith',
    email: 'jane@example.com',
    items: [{ name: 'Cat Bed', qty: 1, price: 39.99 }],
    status: 'Processing',
    total: 39.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1003,
    client: 'Bob Johnson',
    email: 'bob@example.com',
    items: [
      { name: 'Vaccine', qty: 1, price: 19.99 },
      { name: 'Medication', qty: 1, price: 14.99 },
    ],
    status: 'Delivered',
    total: 34.98,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1004,
    client: 'Alice Brown',
    email: 'alice@example.com',
    items: [{ name: 'Bird Cage', qty: 1, price: 59.99 }],
    status: 'Processing',
    total: 59.99,
    createdAt: new Date().toISOString(),
  },
];

const BackOffice: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState(mockAllOrders);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2 }}>
            Back Office
          </Typography>
        </Box>

        <Card sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              John Doe - Store Manager
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Orders Management
            </Typography>

            <Stack spacing={2}>
              {orders.map((o) => (
                <Card key={o.id} variant="outlined" sx={{ position: 'relative' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6">Order #{o.id}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Client: {o.client} ({o.email})
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(o.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={o.status}
                        color={
                          o.status === 'Delivered'
                            ? 'success'
                            : o.status === 'Shipped'
                            ? 'primary'
                            : o.status === 'Ready to ship'
                            ? 'warning'
                            : 'default'
                        }
                        sx={{ ml: 1 }}
                      />
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
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Total: ${o.total.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        onClick={() => updateOrderStatus(o.id, 'Ready to ship')}
                        disabled={o.status === 'Ready to ship' || o.status === 'Shipped' || o.status === 'Delivered'}
                      >
                        Ready to ship
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => updateOrderStatus(o.id, 'Shipped')}
                        disabled={o.status === 'Shipped' || o.status === 'Delivered'}
                      >
                        Shipped
                      </Button>
                    </Box>
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

export default BackOffice;
