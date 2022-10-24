import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

// 수입, 지출 총합 현황 보여주는 컴포넌트
export default function Status(props) {
  
  // 수입, 지출별 총합 구하기
  const totalIncome = props.histories.map(history => history.income).reduce((prev, cur) => prev + cur, 0);
  const totalExpenditure = props.histories.map(history => history.expenditure).reduce((prev, cur) => prev + cur, 0);

  // 현재 날짜 가져오기
  let now = new Date();

  return (
    <React.Fragment>
      <Title>사용금액</Title>
      <Typography component="p" variant="h5">
        ₩{totalExpenditure}
      </Typography>
      <Title>남은금액</Title>
      <Typography component="p" variant="h5">
        ₩{totalIncome - totalExpenditure}
      </Typography>
      <br/>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일 기준
      </Typography>
    </React.Fragment>
  );
}