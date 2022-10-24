import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(useDate, category, income, expenditure, memo) {
//   return { useDate, category, income, expenditure, memo};
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BasicTable(props) {
  const histories = props.histories;
  console.log(histories);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">income</TableCell>
            <TableCell align="right">expenditure</TableCell>
            <TableCell align="right">memo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {histories.map((history) => (
            <TableRow
              key={history.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {history.useDate}
              </TableCell>
              <TableCell align="right">{history.category.title}</TableCell>
              <TableCell align="right">{history.income}</TableCell>
              <TableCell align="right">{history.expenditure}</TableCell>
              <TableCell align="right">{history.memo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
