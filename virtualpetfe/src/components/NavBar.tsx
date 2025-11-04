import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PetsIcon from '@mui/icons-material/Pets';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const pages = ['Products', 'Pricing', 'Blog'];
const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { isAuthenticated, logout } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //opciones del menu desplegable con logica
  const handleLogout = () => {
    logout(); // Llama a la función del contexto useAuth
    handleCloseUserMenu(); // Cierra el menú después de la acción
  };

  let settingOptions = []; // Array vacío para agregar dinamicamente

  //opciones del menu desplegable simples
  if (isAuthenticated) {
    // Si el usuario ESTÁ logueado, mostramos estas opciones
    settingOptions = [
      { label: 'Profile', path: '/profile' },
      { label: 'Account', path: '/account' },
      { label: 'Backoffice', path: '/admin' },
      { label: 'Logout', action: handleLogout }
    ];
  } else {
    // Si el usuario NO ESTÁ logueado, mostramos solo Login
    settingOptions = [
      { label: 'Login', path: '/login' }
    ];
  }

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: '#FFF7DD', color: '#333', borderBottom: '1px solid #e0e0e0' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#80A1BA' }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Quicksand", "Roboto", "Arial", sans-serif',
              fontWeight: 800,
              letterSpacing: '.05rem',
              color: '#435663',
              textDecoration: 'none',
            }}
          >
            VirtualPet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#80A1BA' }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Quicksand", "Roboto", "Arial", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.5rem',
              color: '#435663',
              textDecoration: 'none',
            }}
          >
            VirtualPet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: '#435663', paddingLeft: 10, display: 'block', fontWeight: 600,'&:hover': { bgcolor: 'rgb(180, 222, 189, 0.24)' }}}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingOptions.map((setting) => (
                
                // Opción 1: Si el item tiene 'path', es un LINK
                setting.path ? (
                  <MenuItem
                    key={setting.label}
                    component={RouterLink} // Usa RouterLink COMO el MenuItem
                    to={setting.path}       // Le pasa la ruta
                    onClick={handleCloseUserMenu} // Cierra el menú al hacer click
                  >
                    <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                  </MenuItem>
                ) : (
                
                // Opción 2: Si tiene 'action', es un BOTÓN
                  <MenuItem
                    key={setting.label}
                    onClick={setting.action} // Llama a la acción (ej. handleLogout)
                  >
                    <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                  </MenuItem>
                )

              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar