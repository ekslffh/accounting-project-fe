import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Title from './Title';

function createData(month, income, expenditure) {
  return { month, "수입": income, "지출": expenditure };
}

/**
 * 
 * @param {*} props 
 * @returns 월별 지출의 합
 */
export default function Chart(props) {
  const theme = useTheme();

  // histories를 넘겨 받아서 월별 지출 합 구하기
  const histories = props.histories;
  function getMonth(useDate) {
    return new Date(useDate).getMonth();
  }
  let income = new Array(12);
  let expenditure = new Array(12);
  income.fill(0);
  expenditure.fill(0);
  
  histories.forEach(history => {
    income[getMonth(history.useDate)] = income[getMonth(history.useDate)] + history.income;
    expenditure[getMonth(history.useDate)] = expenditure[getMonth(history.useDate)] + history.expenditure;
  });

  if (parseInt(props.year) === new Date().getFullYear()) {
    income.fill(undefined, new Date().getMonth() + 1);
    expenditure.fill(undefined, new Date().getMonth() + 1);
  }
  
  const data = [
    createData('0', 0, 0),
    createData('1월', income[0], expenditure[0]),
    createData('2월', income[1], expenditure[1]),
    createData('3월', income[2], expenditure[2]),
    createData('4월', income[3], expenditure[3]),
    createData('5월', income[4], expenditure[4]),
    createData('6월', income[5], expenditure[5]),
    createData('7월', income[6], expenditure[6]),
    createData('8월', income[7], expenditure[7]),
    createData('9월', income[8], expenditure[8]),
    createData('10월', income[9], expenditure[9]),
    createData('11월', income[10], expenditure[10]),
    createData('12월', income[11], expenditure[11]),
  ]

  return (
    <React.Fragment>
      <Title>월별지출</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="수입"
            stroke={theme.palette.error.main}
            activeDot={{ r: 8 }}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="지출"
            stroke={theme.palette.primary.main}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

