import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from '../service/ApiService';
import { LockOutlined } from '@mui/icons-material';
import BasicModal from '../components/BasicModal';
import FindID from './FindID';
import FindPW from './FindPW';

const theme = createTheme();

export default function SignIn() {

  const login = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email').trim();
    const password = data.get('password').trim();
    if (email === '') alert("이메일을 입력해주세요.");
    else if (password === '') alert("비밀번호를 입력해주세요.");
    else signIn({ email, password});
  };

  const goToDashBoard = () => {
    window.location.href = "/" + new Date().getFullYear();
  }

  // 로그인, 비로그인 상태 구분해서 내용 출력하기 (기준: jwt-token)
  let contents = (localStorage.getItem("token") === null) 
                ?
               // 비로그인 상태
              <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>
                <Typography component="h1" variant="h5">
                  로그인
                </Typography>
                <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    로그인
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <BasicModal name="아이디"><FindID /></BasicModal>
                      <span>  </span>
                      <BasicModal name="비밀번호찾기"><FindPW /></BasicModal>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"회원가입 하러 가기"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              :
              // 로그인 상태
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                <Typography component="h1" variant="h5">
                  {localStorage.getItem("name")}
                </Typography>
                <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick = {goToDashBoard}
                  >
                    대쉬보드 이동
                  </Button>
                </Box>
              </Box>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}>
          {contents}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}