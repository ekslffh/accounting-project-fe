import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { Button, Grid } from '@mui/material';
import BasicModal from '../../BasicModal';
import AddCategory from '../../AddCategory';
import UpdateCategory from '../../UpdateCategory';
import DeletedCategoryTable from './DeletedCategoryTable';
import styled from '@emotion/styled';
import CategoryCsvData from '../CategoryCsvData';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: theme.palette.common.white,
    backgroundColor: '#bbdefb',
  },
}));

/**
 * 
 * @param {*} props 
 * @returns 카테고리 테이블
 */
export default function Orders_category(props) {

  const rows = props.categories;

  const onClickDeleteButton = (id) => {
    const item = {id}
      props.delete(item);
  }

  let totalAmount = 0;
  rows.map(row => calcAmount(row.amount));

  function calcAmount(money) {
    totalAmount += money;
  }

  return (
    <React.Fragment>
      {/* <Grid container> */}
       {/* <Grid item xs={8}> */}
        <Title>카테고리</Title>
       {/* </Grid>  */}
       {/* <CategoryCsvData year={props.year} department={props.department} /> */}
       {/* <Grid item xs={4} align="right"></Grid> */}
      {/* </Grid> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>이름</TableCell>
            <TableCell align='center'>금액</TableCell>
            <TableCell align='center'>설명</TableCell>
            <TableCell align="right">
              <BasicModal variant="outlined" name="추가"><AddCategory add={props.add} /></BasicModal>
              <BasicModal variant="outlined" name="복구"><DeletedCategoryTable /></BasicModal>
              <CategoryCsvData year={props.year} department={props.department} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align='center'>{row.title}</TableCell>
              <TableCell align='center'>{row.amount}</TableCell>
              <TableCell align='center'>{row.description}</TableCell>
              <TableCell align="right">
                <BasicModal variant="outlined" name="수정" color="warning"><UpdateCategory update={props.update} item={row}/></BasicModal>
                <Button size='small' variant='outlined' color='error' onClick={() => {onClickDeleteButton(row.id)}}>삭제</Button>
              </TableCell>
            </TableRow>
          ))}
           <TableRow>
            <StyledTableCell align='center'>총합계</StyledTableCell>
            <StyledTableCell align='center'>{totalAmount}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}