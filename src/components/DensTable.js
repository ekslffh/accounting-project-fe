import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Typography } from '@mui/material';
import Modal from './BasicModal';
import BasicModal from './BasicModal';

// function createData(name, calories, fat, carbs, protein, temp) {
//   return { name, calories, fat, carbs, protein , temp};
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 3.9),
// ];

export default function DenseTable(props) {

  const histories = props.histories;
  console.log("histories: ", histories.size)
  const rows = histories.map(item => 
      ({
        id: item.id,
        useDate: item.useDate,
        category: item.category,
        income: item.income,
        expenditure: item.expenditure,
        memo: item.memo,
        writer: item.member.name,
      })
  );

  function onClickDeleteButton(id) {
    props.delete(id);
  }

  function onClickUpdateButton(history) {
    console.log("히스토리", history)
    props.update();
    props.setHistory(history);
  }

  return (
    <Container>
        <Typography align='center' margin={3} component="h1" variant="h5">
            사용내역 현황
        </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>사용일</TableCell>
            {/* <TableCell align="right">작성자</TableCell> */}
            <TableCell align="right">작성자</TableCell>
            <TableCell align="right">적요</TableCell>
            <TableCell align="right">수입</TableCell>
            <TableCell align="right">지출</TableCell>
            <TableCell align="right">비고</TableCell>
            <TableCell align="right"><BasicModal add = {props.add} /></TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.useDate}
              </TableCell>
              {/* <TableCell align="right">{row.useDate}</TableCell> */}
              {/* <TableCell >{row.writer}</TableCell> */}
              <TableCell align="right">{row.writer}</TableCell>
              <TableCell align="right">{row.category.title}</TableCell>
              <TableCell align="right">{row.income}</TableCell>
              <TableCell align="right">{row.expenditure}</TableCell>
              <TableCell align="right">{row.memo}</TableCell>
              <TableCell align='right'><Button onClick={() => {onClickUpdateButton(row)}}>수정</Button><Button onClick={() => {onClickDeleteButton(row.id)}}>삭제</Button></TableCell>
              {/* <TableCell align='right'><Button>삭제</Button></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
