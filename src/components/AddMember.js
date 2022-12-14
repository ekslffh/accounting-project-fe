import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const theme = createTheme();

export default function AddMember(props) {

  const [member, setMember] = React.useState({
    status: 'ACTIVE',
    name: '',
    gender: 'MALE',
    phoneNumber: '',
    birth: '',
    memo: ''
  });

  const handleGenderChange = (event) => {
    setMember(prev => ({...prev, gender: event.target.value}))
  }

  const handleStatusChange = (event) => {
    setMember(prev => ({...prev, status: event.target.value}))
  }

  const handleNameChange = (event) => {
    setMember(prev => ({...prev, name: event.target.value}))
  }

  const handlePhoneChange = (event) => {
    setMember(prev => ({...prev, phoneNumber: event.target.value}))
  }

  const handleBirthChange = (event) => {
    setMember(prev => ({...prev, birth: event.target.value}))
  }

  const handleMemoChange = (event) => {
    setMember(prev => ({...prev, memo: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addMember(member);
    setMember({
    status: 'ACTIVE',
    name: '',
    gender: 'MALE',
    phoneNumber: '',
    birth: '',
    memo: ''
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            멤버 추가
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">상태</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={member.status}
                    name="radio-buttons-group"
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel value="ACTIVE" control={<Radio />} label="활성화"/>
                    <FormControlLabel value="JOURNEY" control={<Radio />} label="영적여정" />
                    <FormControlLabel value="SPECIAL" control={<Radio />} label="특수상황" />
                    <FormControlLabel value="INACTIVE" control={<Radio />} label="비활성화" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={member.name}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={3}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={member.gender}
                      name="radio-buttons-group"
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel value="MALE" control={<Radio />} label="남" />
                      <FormControlLabel value="FEMALE" control={<Radio />} label="여" />
                    </RadioGroup>
                  </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="전화번호"
                  id="phone"
                  autoComplete="phone"
                  value={member.phoneNumber}
                  onChange={handlePhoneChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="birth"
                  label="생년월일 6자리"
                  id="birth"
                  autoComplete="birth"
                  value={member.birth}
                  onChange={handleBirthChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="memo"
                  label="메모"
                  id="memo"
                  autoComplete="memo"
                  value={member.memo}
                  onChange={handleMemoChange}
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}