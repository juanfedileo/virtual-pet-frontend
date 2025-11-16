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
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext';

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
  const { accessToken } = useAuth();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  React.useEffect(() => {
    const fetchAllOrders = async () => {
      if (!accessToken) {
        setError('No authentication token found');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/orders/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch orders: ${res.status}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (err: unknown) {
        console.error('Error fetching orders:', err);
        setError((err as Error).message || 'Failed to load orders');
        setOrders(mockAllOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [accessToken, API_URL]);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    const updateStatusOnAPI = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/${orderId}/set-estado/`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus.toLowerCase(),
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to update order status: ${res.status}`);
        }

        // Update local state on success
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } catch (err: unknown) {
        console.error('Error updating order status:', err);
        alert('Failed to update order status. Please try again.');
      }
    };

    updateStatusOnAPI();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary" sx={{ color: '#005E97' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2, color: '#005E97' }}>
            Back Office
          </Typography>
        </Box>

        <Card sx={{ maxHeight: '70vh', overflow: 'auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0, 94, 151, 0.1)' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#005E97' }}>
              Store Manager
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Orders Management
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error && orders.length === 0 ? (
              <Typography sx={{ textAlign: 'center', color: 'error.main', py: 4 }}>
                {error}
              </Typography>
            ) : orders.length > 0 ? (
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
                          sx={{ color: '#714F3A', borderColor: '#8C6751', '&:hover': { backgroundColor: '#FFF1EA' } }}
                          onClick={() => updateOrderStatus(o.id, 'Ready to ship')}
                          disabled={o.status === 'Ready to ship' || o.status === 'Shipped' || o.status === 'Delivered'}
                        >
                          Ready to ship
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: '#005E97', borderColor: '#0477BE', '&:hover': { backgroundColor: '#EBF0FA' } }}
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
            ) : (
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                No orders found
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BackOffice;
