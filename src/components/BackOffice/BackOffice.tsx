import React from 'react';
import { normalizeStatus, translateStatusToSpanish, statusChipColor } from '../../utils/status';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext';

const mockAllOrders = [
  {
    id: 1001,
    client: 'John Doe',
    email: 'john@example.com',
      shippingName: 'John Recipient',
      shippingAddress: '123 Recipient St, City, Country',
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
      shippingName: 'Jane Receiver',
      shippingAddress: '456 Receiver Ave, Town, Country',
    items: [{ name: 'Cat Bed', qty: 1, price: 39.99 }],
    status: 'Processing',
    total: 39.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1003,
    client: 'Bob Johnson',
    email: 'bob@example.com',
      shippingName: 'Bob Recipient',
      shippingAddress: '789 Delivery Rd, Village, Country',
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
      shippingName: 'Alice Receiver',
      shippingAddress: '12 Bird Ln, City, Country',
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
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'error' });

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
          throw new Error(`Error al traer ordenes: ${res.status}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (err: unknown) {
        console.error('Error fetching orders:', err);
        setError((err as Error).message || 'Error al cargar ordenes');
        //setOrders(mockAllOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [accessToken, API_URL]);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    const updateStatusOnAPI = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/${orderId}/set-status/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus.toLowerCase(),
          }),
        });

        if (!res.ok) {
          throw new Error(`Error al actualizar el estado del pedido: ${res.status}`);
        }

        // Update local state on success (save raw/newStatus)
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } catch (err: unknown) {
        console.error('Error al actualizar el estado del pedido:', err);
        setSnackbar({ open: true, message: 'Error al actualizar el estado del pedido. Por favor intenta de nuevo.', severity: 'error' });
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
            Oficina Administrativa
          </Typography>
        </Box>

        <Card sx={{ maxHeight: '70vh', overflow: 'auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0, 94, 151, 0.1)' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#005E97' }}>
              Gestor de Tienda
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Gestión de Pedidos
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
                          <Typography variant="h6">Orden #{o.id}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Cliente: {o.client}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Usuario destinatario: {o.shippingName ?? '-'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Direccion de envio: {o.shippingAddress ?? '-'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(o.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                        {/* Use translated label and color based on raw status */}
                        <Chip
                          label={translateStatusToSpanish(o.status)}
                          color={statusChipColor(o.status) as any}
                          sx={{ ml: 1 }}
                        />
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Stack spacing={0.5}>
                        {(o.itemsRead ?? o.items ?? []).map((it: any, idx: number) => {
                          // API `itemsRead` contains { product: { id, title, price, category }, quantity, priceAtPurchase }
                          if (it.product) {
                            const p = it.product;
                            const qty = it.quantity ?? 1;
                            const priceNum = Number(it.priceAtPurchase ?? p.price ?? 0);
                            return (
                              <Typography key={idx} variant="body2">
                                Producto ID: {p.id} — {p.title} ({p.category}) x{qty} — ${priceNum.toFixed(2)}
                              </Typography>
                            );
                          }

                          // Fallback for older `items` shape
                          if (it.name) {
                            const qty = it.qty ?? 1;
                            const priceNum = Number(it.price ?? 0);
                            return (
                              <Typography key={idx} variant="body2">
                                Producto: {it.name} x{qty} — ${ (priceNum * qty).toFixed(2) }
                              </Typography>
                            );
                          }

                          return null;
                        })}
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {/* Total: ${o.total.toFixed(2)} */}
                        Total: ${Number(o.total).toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: '#714F3A', borderColor: '#8C6751', '&:hover': { backgroundColor: '#FFF1EA' } }}
                          onClick={() => updateOrderStatus(o.id, 'ready to ship')}
                          disabled={
                            normalizeStatus(o.status) === 'ready to ship' ||
                            normalizeStatus(o.status) === 'shipped' ||
                            normalizeStatus(o.status) === 'delivered'
                          }
                        >
                          Listo para enviar
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: '#005E97', borderColor: '#0477BE', '&:hover': { backgroundColor: '#EBF0FA' } }}
                          onClick={() => updateOrderStatus(o.id, 'shipped')}
                          disabled={
                            normalizeStatus(o.status) === 'shipped' || normalizeStatus(o.status) === 'delivered'
                          }
                        >
                          Enviado
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color: '#1E7A1E', borderColor: '#2e7d32', '&:hover': { backgroundColor: '#E6F4EA' } }}
                          onClick={() => updateOrderStatus(o.id, 'delivered')}
                          disabled={normalizeStatus(o.status) === 'delivered'}
                        >
                          Entregado
                        </Button>
                      </Box>
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

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
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

export default BackOffice;
