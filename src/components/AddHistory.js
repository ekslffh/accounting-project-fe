import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import Calendar from './Calendar';
import BasicSelect from './InOrOutSelect';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: '#9e9e9e',//theme.palette.primary.main,
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: theme.spacing(1),
}));

const theme = createTheme();

export default function AddHistory(props) {
  const [dateTime, setDateTime] = React.useState('');
  const [expenditure, setExpenditure] = React.useState(true);
  const [category, setCategory] = React.useState({id: ''});
  const [amount, setAmount] = React.useState('');
  const [memo, setMemo] = React.useState('');

  const categories = props.categories;

  const fileInput = React.useRef();

  const handleFileChange = event => {
    props.setReceipt(event.target.files);
  }

  const handleCategoryChange = (event) => {
    setCategory({id: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (dateTime === '') return alert("날짜 및 시간을 입력해주세요.");
    else if (category.id === '') return alert("카테고리를 선택해주세요.");
    else if (amount.trim() === '') return alert("금액을 입력해 주세요.");
    else if (isNaN(amount)) return alert("금액에 숫자만 입력해주세요.");
    else if (amount < 0) return alert("금액에 음의 값을 넣을 수 없습니다.");

    var inputData = {
      useDate: dateTime, 
      memo: data.get('memo'),
      category: category
    };

    if (expenditure) {
      // 지출일 경우
      inputData.expenditure = parseInt(amount);
      inputData.income = 0;
    } 
    else {
      // 수입일 경우
      inputData.income = parseInt(amount);
      inputData.expenditure = 0;
    }
    props.add(inputData);
    setCategory({id: ''});
    setMemo('');
    setAmount('');
    props.setReceipt(null);
    fileInput.current.value = '';
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
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
            사용내역 추가
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid 
              container 
              spacing={2}
              direction="row"
              alignItems="center"
              >
              <Grid item xs={12} md={5}>
                  <Calendar fullWidth dateTime={dateTime} setDateTime={setDateTime}/>   
              </Grid>
              <Grid item xs={12} md={7}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category.id}
                    label="category"
                    onChange={handleCategoryChange}
                  >
                    {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
                  </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <BasicSelect inOrOut='expenditure' setExpenditure={setExpenditure} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="amount"
                  label="금액"
                  name="amount"
                  autoComplete="amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <label htmlFor="files">
                  <Div style={{textAlign: 'center'}}>영수증등록</Div>
                </label>
                <input 
                  type="file" 
                  multiple
                  id="files" 
                  style={{ display: 'none' }}
                  onChange={handleFileChange} 
                  ref={fileInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="memo"
                  label="비고"
                  id="memo"
                  autoComplete="memo"
                  value={memo}
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