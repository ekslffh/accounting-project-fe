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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { call } from '../service/ApiService';
import BasicModal from '../components/BasicModal';
import UpdatePassword from '../components/UpdatePassword';
import { Done } from '@mui/icons-material';
import { API_BASE_URL } from '../config/app-config';
import axios from 'axios';

const theme = createTheme();

export default function UserUpdate() {

  const [member, setMember] = React.useState();
  const [name, setName] = React.useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  // 부서 선택
  const [department, setDepartment] = React.useState({ name: '' });
  const [departments, setDepartments] = React.useState([]);
  const handleDepartmentChange = (event) => {
    setDepartment({name: event.target.value});
  };

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

  // 태어난 일 선택
  const [day, setDay] = React.useState('')
  const handleDayChange = (event) => {
    if (event.target.value.length <= 2)
    setDay(event.target.value);
  }

  // 1999 2월 1일 -> 1999.02.01
  function parseDate(y, m, d) {
    if (d.charAt(0) === '0') d = d.charAt(1);
    return y + "." + m + "." + d;
  }

  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isPhoneChange, setIsPhoneChange] = React.useState(false);
  // const [isPhoneChange, setIsPhoneChange] = React.useState(true);
  const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
      if (event.target.value === member.phoneNumber) setIsPhoneChange(false);
      else setIsPhoneChange(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const birth = parseDate(year, month, day);

    const senderMember = {
        id: member.id,
        email: data.get('email'),
        name: data.get('name'),
        department: department,
        birth,
        phoneNumber,
    };

    call("/member", "PUT", senderMember)
    .then(res => {
      alert("유저정보가 수정되었습니다.")
    })
  };

  React.useEffect(() => {
    call("/member/principal").then(res => {
        setMember(res);
        setName(res.name);
        setPhoneNumber(res.phoneNumber);
        const birth = res.birth.split(".");
        setYear(birth[0]);
        setMonth(birth[1]);
        setDay(birth[2]);
    })
  }, []);

  const onClickAuthPhone = () => {
    setPhoneRequest(true);
    axios.post(API_BASE_URL + "/auth/phone", {"receiver": phoneNumber})
    .then(res => setAuthNumber(res.data.toString()))
    .catch(err => console.log(err));
  }

  const [phoneRequest, setPhoneRequest] = React.useState(false);

  const [authNumber, setAuthNumber] = React.useState('');

  const [isPhoneAuth, setIsPhoneAuth] = React.useState(false);

  const onClickPhoneRequest = () => {
    // console.log("실제 인증번호: ", authNumber);
    // console.log("입력 인증번호: ", messageNumber);
    // console.log("실제 인증번호 타입: ", typeof(authNumber));
    // console.log("입력 인증번호 타입: ", typeof(messageNumber));
    if (authNumber === messageNumber) {
      setIsPhoneAuth(true);
      alert("휴대폰 인증 완료하였습니다.");
      setPhoneRequest(false);
      setIsPhoneChange(false);
    }
    else {
      alert("휴대폰 인증 실패하였습니다.")
      setPhoneRequest(false);
      setMessageNumber('');
    }
  }

  // messageNumber : 내가 입력하는 인증번호
  const [messageNumber, setMessageNumber] = React.useState('');
  const handleMessage = (e) => {
    setMessageNumber(e.target.value);
  }

  // 인증번호 요청 버튼을 눌렀을 때 
  let phoneAuthContent = phoneRequest ?   
  <>
  <Grid item xs={5}>
    <TextField id="filled-basic" label="인증번호 4자리" variant="filled" value={messageNumber} onChange={handleMessage} />
  </Grid>
  <Grid item xs={3}>
    <Button variant='outlined' onClick={onClickPhoneRequest}>확인</Button>
  </Grid> 
  </>
  :null;

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            회원정보수정
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid 
              container 
              spacing={2} 
              direction="row"
             //  justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  value={member !== undefined && member.email}
                  name="email"
                  autoComplete="email"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  onChange={handleNameChange}
                  value={member !== undefined && name}
                  // defaultValue={member !== undefined && member.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="given-name"
                  name="department"
                  disabled
                  fullWidth
                  value={member !== undefined && member.department.name}
                  id="deparment"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="year"
                  // label="생년(4자)"
                  value={year}
                  onChange={handleYearChange}
                  name="year"
                  autoComplete="year"
                />
              </Grid>
              <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">월</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                  autoComplete="day"
                />
              </Grid>
             {isPhoneChange 
             ?
             <>
              <Grid item xs={8}>
              <TextField
                fullWidth
                id="phone-number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="숫자만 입력 (예시: 01012345678)"
                name="phone-number"
                label="전화번호"
                autoComplete="phone-number"
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              {isPhoneAuth 
                ? 
                <Done fontSize='large' color='primary'/>
                : 
                <Button variant='outlined' onClick={onClickAuthPhone}>인증번호 요청</Button>
              }
            </Grid>
            </>
            :
            <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone-number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="숫자만 입력 (예시: 01012345678)"
              name="phone-number"
              label="전화번호"
              autoComplete="phone-number"
            />
          </Grid>
            }
              {phoneAuthContent}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isPhoneChange}
            >
              수정
            </Button>
          </Box>
        </Box>
        <BasicModal name="비밀번호 변경하기"><UpdatePassword /></BasicModal>
      </Container>
    </ThemeProvider>
  );
}