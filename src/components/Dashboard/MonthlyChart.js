import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

function createData(time, amount) {
  return { time, amount };
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
  let month = new Array(11);
  month.fill(0);
  month.fill(undefined, new Date().getMonth() + 1);
  histories.forEach(history => month[getMonth(history.useDate)] = month[getMonth(history.useDate)] + history.expenditure);
  const data = [
    createData('0', 0),
    createData('1', month[0]),
    createData('2', month[1]),
    createData('3', month[2]),
    createData('4', month[3]),
    createData('5', month[4]),
    createData('6', month[5]),
    createData('7', month[6]),
    createData('8', month[7]),
    createData('9', month[8]),
    createData('10', month[9]),
    createData('11', month[10]),
    createData('12', month[11]),
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
            dataKey="time"
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
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}