import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { call } from '../service/ApiService';
import { Done } from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../config/app-config';

const theme = createTheme();

export default function FindPW() {

  // 아이디 입력 및 중복체크하기
  const [email, setEmail] = React.useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [name, setName] = React.useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  // 전화번호 입력 및 인증번호 받아 입력하기
  const [phoneNumber, setPhoneNumber] = React.useState('');
  // 인증요청 보냈는지 상태값 저장
  const [sendPhoneRequest, setSendPhoneRequest] = React.useState(false);
  // 인증요청 후 서버로부터 받은 인증번호 4자리 값 저장
  const [authNumber, setAuthNumber] = React.useState('');
  // 휴대폰 인증완료 했는지 상태값 저장
  const [phoneAuthCheck, setPhoneAuthCheck] = React.useState(false);
  // messageNumber : 내가 입력하는 인증번호
  const [messageNumber, setMessageNumber] = React.useState('');
  const [authPhoneNumber, setAuthPhoneNumber] = React.useState('');

  const handlePhoneNumberChange = (event) => {
      if (authPhoneNumber !== event.target.value) {
        setMessageNumber('');
        setPhoneAuthCheck(false);
      }
      else {
        setPhoneAuthCheck(true);
      }
      setPhoneNumber(event.target.value);
  }

  const handleMessage = (event) => {
    setMessageNumber(event.target.value);
  }

  const onClickPhoneRequestButton = () => {
    if (email.trim() === '') return alert("이메일을 입력해주세요.");
    else if (name.trim() === '') return alert("이름을 입력해주세요.");
    else if (phoneNumber.trim() === '') return alert("전화번호를 입력해주세요.");
    setSendPhoneRequest(true);
    // 서버로 요청보내고 인증번호 4자리값 저장 (이후에 입력한 값과 비교한다)
    axios.post(API_BASE_URL + "/auth/phone", {"receiver": phoneNumber})
    .then(res => setAuthNumber(res.data.toString()))
    .catch(err => console.log(err));
  }
  
  const onClickPhoneAuthButton = () => {
    // 실제 인증번호(authNumber)와 메시지로 받아 입력한 값(messageNumber)를 비교한다
    if (authNumber !== '' && authNumber === messageNumber) {
      setPhoneAuthCheck(true);
      setAuthPhoneNumber(phoneNumber);
      // alert("휴대폰 인증 완료하였습니다.");
      call("/auth/find-password", "PUT", { email, phoneNumber })
      .then(res => {
        alert("휴대폰으로 발송된 임시비밀번호를 이용하여 로그인 해주세요.");
        window.location.href="/signin";
      })
      .catch(res => {
        alert(res.error);
        console.log(res.error);
      });
    }
    else {
      setMessageNumber('');
      alert("휴대폰 인증 실패하였습니다.")
    }
    setSendPhoneRequest(false);
  }

  // 인증번호 요청 버튼을 눌렀을 때 밑에 인증할 수 있는 입력칸 출력하기
  let phoneAuthContent = sendPhoneRequest 
                        ?   
                        <>
                        <Grid item xs={5}>
                          <TextField id="filled-basic" label="인증번호 4자리" variant="filled" value={messageNumber} onChange={handleMessage} />
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant='contained' onClick={onClickPhoneAuthButton}>인증</Button>
                        </Grid> 
                        </>
                        :null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {
            (!phoneAuthCheck)
            ?
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            비밀번호 찾기
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid 
               container 
               spacing={2} 
               direction="row"
               alignItems="center"
            >
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  label="이름"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="phone-number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="숫자만 입력 (예시: 01012345678)"
                  name="phone-number"
                  label="전화번호"
                  required
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={4}>
                {phoneAuthCheck 
                  ? 
                  <Done fontSize='large' color='primary'/>
                  : 
                  <Button variant='outlined' onClick={onClickPhoneRequestButton}>인증번호 요청</Button>
                }
              </Grid>
              {phoneAuthContent}
            </Grid>
          </Box>
            </>
          :
          <Typography component="h1" variant="h5">
            휴대폰 인증완료
          </Typography>
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}