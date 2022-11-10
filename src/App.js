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
import { AppBar, Box, Button, createTheme, CssBaseline, Grid, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { logout } from './service/ApiService';
import MenuIcon from '@mui/icons-material/Menu';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { AccountCircleRounded } from '@mui/icons-material';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#42a5f5',
    // },
    secondary: {
      main: '#f44336',
    },
    hyesung: {
      main: green[500],
    }
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      HSAP {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {

    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" color='primary'>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Grid container>
              <Grid item xs={6}>
              <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <a href={"/" + new Date().getFullYear()} style={{textDecoration: 'none', color: 'white'}}>HSAP</a>
            </Typography>
              </Grid>
              <Grid item xs={6} textAlign='right'>
              <IconButton color="inherit" onClick={() => {window.location.href = "/user-update"}}>
              <AccountCircleRounded />
            </IconButton>
            <Button onClick={logout} variant='Outlined'>로그아웃</Button>
              </Grid>
            </Grid>
           
          
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