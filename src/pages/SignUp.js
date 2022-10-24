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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { call, getDepartments, signUp } from '../service/ApiService';
import { Done } from '@mui/icons-material';

const theme = createTheme();

export default function SignUp() {

  // 아이디 입력 및 중복체크하기
  const [email, setEmail] = React.useState('');
  const [duplicateCheck, setDuplicateCheck] = React.useState(false); // 처음에는 중복체크 안됨
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setDuplicateCheck(false);
  };
  // 아이디 중복 체크 하기
  const onclickDuplicateButton = () => {
    setEmail(email.trim());
    if (email === '') alert("이메일을 입력해주세요.");
    else {
      call("/auth/emailcheck?email=" + email, "GET", null)
    // 중복 : true, 중복안됨 : false
    .then(res => {
      if(!res) setDuplicateCheck(true);
      else alert("이메일이 중복되었습니다.");
      });
    }
  }
  // 중복검사 되어있으면 V, 아니면 중복검사 버튼 출력
  let checkEmailContent = duplicateCheck 
                          ? 
                          <Done fontSize='large' color='primary'/>
                          :  
                          <Button 
                            variant='outlined' 
                            onClick={onclickDuplicateButton}
                          >
                            중복검사
                          </Button>

  // 부서 선택
  React.useEffect(() => {
    getDepartments().then(res => setDepartments(res));
  }, []);
  const [department, setDepartment] = React.useState({ name: '' });
  const [departments, setDepartments] = React.useState([]);
  const handleDepartmentChange = (event) => {
    setDepartment({name: event.target.value});
  };
  
  // 생년월일 입력 : 각 년(4자리), 월(1~12), 일(최대 2자리) 입력 제한
  // 태어난 연도 선택
  const [year, setYear] = React.useState('')
  const handleYearChange = (event) => {
    if (event.target.value.length <= 4)
      setYear(event.target.value);
  }
  // 태어난 달 선택
  const [month, setMonth] = React.useState('');
  const allMonth = ['1', '2', '3','4','5','6','7','8','9','10', '11', '12'];
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  // 태어난 날 선택
  const [day, setDay] = React.useState('')
  const handleDayChange = (event) => {
    if (event.target.value.length <= 2)
    setDay(event.target.value);
  }
  // 1999 2월 1일 -> 1999.2.1
  function parseDate(y, m, d) {
    return y + "." + m + "." + d;
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
  const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
  }
  const handleMessage = (event) => {
    setMessageNumber(event.target.value);
  }
  const onClickPhoneRequestButton = () => {
    setSendPhoneRequest(true);
    // 서버로 요청보내고 인증번호 4자리값 저장 (이후에 입력한 값과 비교한다)
    call("/auth/phone", "POST", {"receiver": phoneNumber})
    .then(response => setAuthNumber(response.toString()));
  }
  const onClickPhoneAuthButton = () => {
    // 실제 인증번호(authNumber)와 메시지로 받아 입력한 값(messageNumber)를 비교한다
    if (authNumber === messageNumber) {
      setPhoneAuthCheck(true);
      alert("휴대폰 인증 완료하였습니다.");
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
                          <Button variant='outlined' onClick={onClickPhoneAuthButton}>인증</Button>
                        </Grid> 
                        </>
                        :null;

  // 제출 : 제출전에 비어있는 내용있는지 확인하기                        
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('password').trim() === '') {
      alert("비밀번호를 입력해주세요.");
    } 
    else if (data.get('name').trim() === '') {
      alert("이름을 입력해주세요.");
    }
    else if (department.name === '') {
      alert("부서를 선택해주세요.")
    }
    else if (year === '' || month === '' || day === '') {
      alert("생년월일을 입력해주세요.")
    }
    else {
      const birth = parseDate(year, month, day);
      signUp({
        email: data.get('email'),
        password: data.get('password').trim(),
        name: data.get('name'.trim()),
        department: department,
        birth,
        phoneNumber,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid 
               container 
               spacing={2} 
               direction="row"
               alignItems="center"
            >
              <Grid item xs={9}>
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
              <Grid item xs={3}>
                {checkEmailContent}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="이름"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="department-select" required>부서</InputLabel>
                    <Select
                      labelId="department-select"
                      id="department-select"
                      value={department.name}
                      label="department"
                      onChange={handleDepartmentChange}
                    >
                      {departments.map(d => <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>)}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="year"
                  label="생년(4자)"
                  value={year}
                  onChange={handleYearChange}
                  name="year"
                />
              </Grid>
              <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="month-select">월</InputLabel>
                <Select
                  labelId="month-select"
                  id="month-select"
                  value={month}
                  label="월"
                  onChange={handleMonthChange}
                >
                  {allMonth.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="day"
                  value={day}
                  onChange={handleDayChange}
                  label="일"
                  name="day"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!(duplicateCheck && phoneAuthCheck)}
            >
              완료
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  로그인 하러 가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}