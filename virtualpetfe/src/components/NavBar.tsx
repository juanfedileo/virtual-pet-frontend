// NavBar is a presentational component — no React namespace import required with the current JSX setup
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
// Avatar and MenuItem removed (settings/menu deleted)
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, zIndex: 1100 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              VirtualPet
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton component={Link} to="/cart" color="inherit" aria-label="cart">
              <ShoppingCartIcon />
            </IconButton>

            <IconButton component={Link} to="/orders" color="inherit" aria-label="orders">
              <ReceiptLongIcon />
            </IconButton>

            <IconButton component={Link} to="/backoffice" color="inherit" aria-label="backoffice">
              <AdminPanelSettingsIcon />
            </IconButton>

            <IconButton component={Link} to="/login" color="inherit" aria-label="login">
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar