// Material UI ResponsiveAppBar lifted as is
// Reference: https://github.com/mui/material-ui/blob/v5.10.4/docs/data/material/components/app-bar/ResponsiveAppBar.js
// Docs: https://mui.com/material-ui/react-app-bar/
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
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTheme } from '@mui/material';
import logoSrc from '../../../../../public/images/Logo.svg';
import { useAuth } from '../../../contexts/AuthContext';

const settings = ['Profile', 'Dashboard', 'Login'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const history = useNavigate();
  const [error, setError] = useState('');
  const { currentUser ,logout } = useAuth();

  const pages = currentUser != null ? (currentUser.displayName == "Member" ? ['Member Dashboard','FAQ', 'Logout'] :['Buyer Dashboard','FAQ', 'Logout'] ) : ['FAQ', 'Login'];
  const settings = currentUser != null ? (currentUser.displayName == "Member" ? ['Profile', 'Member Dashboard']  :['Profile', 'Buyer Dashboard']  ) : ['FAQ', 'Login'];


  async function handleLogout() {
    setError('');
    console.log('handling logout');

    try {
      await logout();
      // history('/login');
    } catch (e) {
      setError('Failed to log out');
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const eventHandler = (option) => (event) => { 
    console.log("event: "+option);
    if(option=="Logout")
    {
      handleLogout();
      history("/");
    }
    else if(option=="Login")
    {
      history("/login")
    } 
    else if(option=="FAQ"){
      history("/faq")
    } 
    else if(option == "Member Dashboard"){
      history("/manage-data-points");
    }
    else if(option == "Buyer Dashboard"){
      history("/select-data-points");
    }
    else if(option == 'Profile')
    {
      history("/member-profile");
    }
  }


  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img alt="Count Me In Logo" src={logoSrc} width={60} height={60} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {history("/");}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            COUNT ME IN
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={eventHandler(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img alt="Count Me In Logo" src={logoSrc} width={60} height={60} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Montserrat',
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            COUNT ME IN
          </Typography>
          <Box sx={{
            flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' }, mr: 10
          }}
          >
            {pages.map(page => (
              <Button
                key={page}
                onClick={eventHandler(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
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
              {settings.map(setting => (
                <MenuItem key={setting} onClick={eventHandler(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
