import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Button } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits_admin() {
  return (
    <React.Fragment>
      <Title>사용금액</Title>
      <Typography component="p" variant="h5">
        ₩100,000
      </Typography>
      <Title>남은금액</Title>
      <Typography component="p" variant="h5">
        ₩20,000
      </Typography>
      <br />
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019 기준
      </Typography>
      {/* <div>
        <Button variant="contained" size='small' color="primary" onClick={preventDefault}>
          사용내역 추가하기
        </Button>
      </div> */}
    </React.Fragment>
  );
}