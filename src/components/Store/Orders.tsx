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
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext';
import { translateStatusToSpanish, statusChipColor } from '../../utils/status';
//import { normalizeStatus} from '../../utils/status';

/*
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
*/

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!accessToken) {
        setError('Sin token de autenticacion');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/orders/my-orders`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error al traer los pedidos: ${res.status}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (err: unknown) {
        console.error('Error al cargar los pedidos:', err);
        setError((err as Error).message || 'Error al cargar los pedidos');
        //setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken, API_URL]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary" sx={{ color: '#005E97' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2, color: '#005E97' }}>
            Mis Pedidos
          </Typography>
        </Box>

        <Card sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          <CardContent>
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
                          {/* <Typography variant="h6">Order #{o.id}</Typography>
                          <Typography variant="caption" color="text.secondary">{new Date(o.createdAt).toLocaleString()}</Typography> */}
                          <Typography variant="h6">Orden #{o.id}</Typography>
                          <Typography variant="caption" color="text.secondary">
                              {/* Si existe o.createdAt, formatéala. Si no, muestra 'Fecha no disponible'. */}
                              {o.createdAt ? new Date(o.createdAt).toLocaleString() : 'Fecha no disponible'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, mb: 1 }}>
                                {o.notificationChannels?.map((channel: string) => (
                                  <Chip 
                                    key={channel} 
                                    label={channel === 'email' ? '📧 Email' : channel === 'whatsapp' ? '📱 WhatsApp' : channel} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ fontSize: '0.75rem', height: '24px' }}
                                  />
                                ))}
                              </Box>
                        </Box>
                        <Chip label={translateStatusToSpanish(o.status)} color={statusChipColor(o.status) as any} sx={{ ml: 1 }} />
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Stack spacing={0.5}>
                        {o.itemsRead?.map((it: any, idx: number) => (
                        <Typography key={idx} variant="body2">
                          {it.product.title} x{it.quantity} — 
                          ${(Number(it.priceAtPurchase) * it.quantity).toFixed(2)}
                        </Typography>
                      ))}
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>${Number(o.total).toFixed(2)}</Typography>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                No se encontraron pedidos
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Orders;
