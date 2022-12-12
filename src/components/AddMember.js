import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RaidoGender from './RadioGender';
import RaidoStatus from './RadioStatus';

const theme = createTheme();

export default function AddMember(props) {

const [title, setTitle] = React.useState('')
const [description, setDescription] = React.useState('')
const [amount, setAmount] = React.useState("")

  const [member, setMember] = React.useState({
    status: 'ACTIVE',
    name: '',
    gender: 'MALE',
    phone: '',
    birth: '',
    memo: ''
  });

  React.useEffect(() => {
    console.log("member:", member)
  }, [member])

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
    setMember(prev => ({...prev, phone: event.target.value}))
  }

  const handleBirthChange = (event) => {
    setMember(prev => ({...prev, birth: event.target.value}))
  }

  const handleMemoChange = (event) => {
    setMember(prev => ({...prev, memo: event.target.value}))
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.addMember(member);
    setMember({
    status: 'ACTIVE',
    name: '',
    gender: 'MALE',
    phone: '',
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
                <RaidoStatus handleStatusChange={handleStatusChange} status="ACTIVE" />
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
                <RaidoGender handleGenderChange={handleGenderChange} gender="MALE" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="전화번호"
                  id="phone"
                  autoComplete="phone"
                  value={member.phone}
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