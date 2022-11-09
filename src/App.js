import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './pages/Admin';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import User from "./pages/User";
import Leader from "./pages/Leader";
import AccessDenied from './pages/AccessDenied';
import UserUpdate from './pages/UserUpdate';
import { AppBar, Box, Button, createTheme, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer';
import { logout } from './service/ApiService';
import MenuIcon from '@mui/icons-material/Menu';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { AccountCircleRounded } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      HSAP {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
    return (
      <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <a href={"/" + new Date().getFullYear()} style={{textDecoration: 'none', color: 'white'}}>HSAP</a>
            </Typography>
            <IconButton color="inherit" onClick={() => {window.location.href = "/user-update"}}>
              <AccountCircleRounded />
            </IconButton>
            <Button onClick={logout} variant='Outlined'>로그아웃</Button>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <BrowserRouter>
            <Switch>
              <Route path='/signup' exact component={SignUp} />
              <Route path="/signin" exact component={SignIn} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/leader/:name/:year" exact component={Leader} />
              <Route path="/user/:year" exact component={User} />
              <Route path="/user-update" exact component={UserUpdate} />
              <Route path="/access-denied" exact component={AccessDenied} />
              <Route path="/:year" exact component={Home} />
              <Route component={NotFound} />
            </Switch>  
            <Copyright />
          </BrowserRouter>
          </Box>
      </Box>
    </ThemeProvider>
    )
}