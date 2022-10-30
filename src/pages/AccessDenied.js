import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default function AccessDenied() {
  
  const onClickHomeButton = () => { window.location.href = "/"; }
  return (
    <>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              403 ERROR
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              해당 요청에 대한 권한이 없습니다. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={onClickHomeButton}>홈으로 이동</Button>
            </Stack>
          </Container>
    </>
  )
}