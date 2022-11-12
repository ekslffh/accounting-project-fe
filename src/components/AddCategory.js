import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function AddCategory(props) {

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState(0);

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
    var inputData = {
        title: title.trim(),
        description: description.trim(),
        amount
    };
    props.add(inputData);
    setTitle("");
    setDescription("");
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
            카테고리 추가
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="이름"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={title}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="설명"
                  id="description"
                  autoComplete="description"
                  value={description}
                  onChange={handleDescChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="amount"
                  label="금액"
                  id="amount"
                  autoComplete="amount"
                  value={amount}
                  onChange={handleAmountChange}
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