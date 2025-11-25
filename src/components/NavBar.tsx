// NavBar is a presentational component — no React namespace import required with the current JSX setup
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../contexts/CartContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth() as any;
  const { cart } = useCart();
  const itemCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1100,
        background: 'linear-gradient(135deg, #005E97 0%, #0477BE 100%)',
        boxShadow: '0 4px 12px rgba(0, 94, 151, 0.15)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'Quicksand, monospace',
                fontWeight: 700,
                letterSpacing: '0.1rem',
                fontSize: '1.3rem',
              }}
            >
              VirtualPet
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Tooltip title="Carrito">
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                aria-label="carrito"
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  transition: 'background-color 0.3s',
                }}
              >
                <Badge badgeContent={itemCount} color="error" overlap="circular" invisible={itemCount === 0}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {isAuthenticated && role === 'cliente' && (
              <Tooltip title="Mis pedidos">
                <IconButton
                  component={Link}
                  to="/orders"
                  color="inherit"
                  aria-label="pedidos"
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, transition: 'background-color 0.3s' }}
                >
                  <ReceiptLongIcon />
                </IconButton>
              </Tooltip>
            )}

            {isAuthenticated && role === 'empleado' && (
              <Tooltip title="Oficina administrativa">
                <IconButton
                  component={Link}
                  to="/backoffice"
                  color="inherit"
                  aria-label="oficina-administrativa"
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, transition: 'background-color 0.3s' }}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
            )}

            {!isAuthenticated ? (
              <Tooltip title="Iniciar sesión">
                <IconButton
                  component={Link}
                  to="/login"
                  color="inherit"
                  aria-label="iniciar-sesion"
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, transition: 'background-color 0.3s' }}
                >
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Cerrar sesión">
                <IconButton
                  onClick={handleLogout}
                  color="inherit"
                  aria-label="cerrar-sesion"
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, transition: 'background-color 0.3s' }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar