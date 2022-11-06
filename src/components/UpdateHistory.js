import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, styled, Switch } from '@mui/material';
import Calendar from './Calendar';
import BasicSelect from './BasicSelect';

const theme = createTheme();

const UpdateButton = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: '#64b5f6',//theme.palette.primary.main,
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: theme.spacing(1),
}));

const DeleteButton = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: '#ef5350',//theme.palette.primary.main,
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: theme.spacing(1),
}));

export default function UpdateHistory(props) {
  const item = props.item;

  const [dateTime, setDateTime] = React.useState(item.useDate);
  const [category, setCategory] = React.useState({id: item.category.id});
  const [expenditure, setExpenditure] = React.useState(item.expenditure !== 0);

  const [amount, setAmount] = React.useState(0)
  const [inOurOut, setInOrOut] = React.useState('')
  const categories = props.categories;
  const [memo, setMemo] = React.useState(item.memo);
  const handleChange = (event) => {
    setCategory({id: event.target.value});
  };

  const fileInput = React.useRef();
  const isHaveImage = (item.imagePath.length !== 0);
  const handleFileChange = event => {
    props.setReceipt(event.target.files);
  }

  React.useEffect(() => {
    if (item.income === 0) {
      // 지출
      setAmount(item.expenditure);
      setInOrOut('expenditure');
    }
    else {
      // 수입
      setAmount(item.income);
      setInOrOut('income');
    }
  },[]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var inputData = {
      useDate: dateTime, 
      memo: data.get('memo'),
      category: category
    };
    if (expenditure) {
      // console.log('지출')
      inputData.expenditure = parseInt(data.get('amount'));
      inputData.income = 0;
    } 
    else {
      // console.log('수입')
      inputData.income = parseInt(data.get('amount'));
      inputData.expenditure = 0;
    }
    inputData.id = item.id;
    inputData.imagePath = props.imagePath;
    props.update(inputData);
    props.setReceipt(null);
    props.initializeSearch();
    fileInput.current.value = '';
  };

  const onClickDeleteReceiptButton = () => {
    const inputData = {
      id: item.id,
      imagePath: props.imagePath
    };
    props.deleteReceipt(inputData);
  }

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
            사용내역 수정
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid 
              container 
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={5}>
                  <Calendar fullWidth dateTime={dateTime} setDateTime={setDateTime}/>   
              </Grid>
              <Grid item xs={7}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category.id}
                    label="category"
                    onChange={handleChange}
                  >
                    {categories.map(c => <MenuItem key={c.title} value={c.id}>{c.title}</MenuItem>)}
                  </Select>
              </FormControl>
              </Grid>
             {
             isHaveImage 
             ?
             <>
               <Grid item xs={3}>
                <BasicSelect inOrOut={inOurOut} setExpenditure={setExpenditure}/>
              </Grid>
              <Grid item xs={5}>
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
              <Grid item xs={2}>
                <label htmlFor="files">
                  <UpdateButton>영수증수정</UpdateButton>
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
              <Grid item xs={2}>
                <DeleteButton onClick={onClickDeleteReceiptButton}>영수증삭제</DeleteButton>
              </Grid>
             </> 
             :
             <>
               <Grid item xs={3}>
                <BasicSelect inOrOut={inOurOut} setExpenditure={setExpenditure}/>
              </Grid>
              <Grid item xs={7}>
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
              <Grid item xs={2}>
                <label htmlFor="files">
                  <UpdateButton>영수증등록</UpdateButton>
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
             </>
             }
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
              수정
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}