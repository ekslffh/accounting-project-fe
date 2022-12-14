import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import BasicModal from '../../BasicModal'
import AddHistory from '../../AddHistory';
import UpdateHistory from '../../UpdateHistory';
import styled from '@emotion/styled';
import CsvData from '../CsvData';
import { CheckRounded, ReceiptLong } from '@mui/icons-material';
import BasicImageList from '../../BasicImageList';
import ChangeYear from '../../ChangeYear';
import PrintReceipts from '../../PrintReceipts';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: theme.palette.common.white,
    backgroundColor: '#bbdefb',
  },
}));

export default function LeaderHistoryTable(props) {
  // 잔액
  let money = 0;
  const rows = props.histories;
  const categories = props.categories;
  const members = props.members;

  const handleCategoryChange = (event) => {
    props.setCategory({id: event.target.value});
  };
  const handleMemberChange = (event) => {
    props.setMember({id: event.target.value});
  }
  const handleTimeChange = (event) => {
    props.setQuarter(event.target.value);
  };
  const onClickDeleteButton = (row) => {
    const item = {
      id: row.id,
      imagePath: row.imagePath
    }
    props.delete(item);
  }
  const onClickPaymentButton = (row) => {
    const item = {
      id: row.id,
      payment: row.payment
    }
    props.changePaymentOrNot(item);
  }
  
  // 수입, 지출 별 합 구하기
  const totalIncome = rows.map(row => row.income).reduce((prev, cur) => prev + cur, 0);
  const totalExpenditure = rows.map(row => row.expenditure).reduce((prev, cur) => prev + cur, 0);
  const imagePath = rows.map(row => row.imagePath).reduce((prev, cur) => prev.concat(cur), []);

   // 사용일 기준 오름차순
   rows.sort(function(a, b) {
    var keyA = new Date(a.useDate), keyB = new Date(b.useDate);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  })

  function parseDate(date) {
    const year =  date.substr(2, 2);
    const month = date.substr(5, 2); //(date.charAt(5) !== '0') ? date.substr(5, 2) : date.substr(6, 1);
    const day = date.substr(8,2); //(date.charAt(8) !== '0') ? date.substr(8,2) : date.substr(9,1);
    const hour = date.substr(11,2);
    const minute = date.substr(14,2);
    return `${year}${month}${day} ${hour}:${minute}`;
  }

  // 수입이면 더하고 지출이면 빼서 잔액 구하기
  function calcMoney(income, expenditure) {
    if (income !== 0) money += income;
    else money -= expenditure;
    return money;
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={3}>
        <Title>내역현황</Title>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">멤버</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.member.id}
            label="member"
            onChange={handleMemberChange}
          >
            {members.map(m => <MenuItem key={m.id} value={m.id}>{m.name} ({m.birth})</MenuItem>)}
            <MenuItem value={0}>전체</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.category.id}
            label="category"
            onChange={handleCategoryChange}
          >
            {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
            <MenuItem value={0}>전체</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">분기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.quarter}
          label="Age"
          onChange={handleTimeChange}
        >
          <MenuItem value={1}>1분기</MenuItem>
          <MenuItem value={2}>2분기</MenuItem>
          <MenuItem value={3}>3분기</MenuItem>
          <MenuItem value={4}>4분기</MenuItem>
          <MenuItem value={0}>전체</MenuItem>
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>결제여부</TableCell>
            <TableCell align='center'>사용일</TableCell>
            <TableCell align='center'>적요</TableCell>
            <TableCell align='center'>수입</TableCell>
            <TableCell align='center'>지출</TableCell>
            <TableCell align='center'>잔액</TableCell>
            <TableCell align='center'>비고</TableCell>
            <TableCell align='center'>작성자</TableCell>
            <TableCell align='center'>영수증</TableCell>
            <TableCell align="right">
              <BasicModal variant='outlined' name="추가">
                <AddHistory add={props.add} setReceipt={props.setReceipt} categories={categories} />
              </BasicModal>
                <Button><CsvData data={rows} totalIncome={totalIncome} totalExpenditure={totalExpenditure} /></Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align='center'>{row.payment && <CheckRounded color='primary'/>}</TableCell>
              <TableCell align='center'>{parseDate(row.useDate)}</TableCell>
              <TableCell align='center'>{row.category.title}</TableCell>
              <TableCell align='center'>{row.income}</TableCell>
              <TableCell align='center'>{row.expenditure}</TableCell>
              <TableCell align='center'>{calcMoney(row.income, row.expenditure)}</TableCell>
              <TableCell align='center'>{row.memo}</TableCell>
              <TableCell align='center'>{row.member.name}</TableCell>
              <TableCell align='center'>
                {(row.imagePath.length !== 0) 
                && 
                <BasicModal name={<ReceiptLong />}><BasicImageList items={row.imagePath} /></BasicModal>}
              </TableCell>
              <TableCell align="right">
                {!(row.payment) ?
                 <Button variant='outlined' size='small' onClick={() => {onClickPaymentButton(row)}}>결제</Button>
                :
                <Button variant='outlined' color='error' size='small' onClick={() => {onClickPaymentButton(row)}}>취소</Button>
                }
                <BasicModal variant="outlined" name="수정" color="warning"><UpdateHistory deleteReceipt={props.deleteReceipt} setReceipt={props.setReceipt} imagePath={row.imagePath} categories={categories} item={row} update={props.update} /></BasicModal>
                <Button variant='outlined' size='small' color='error' onClick={() => {onClickDeleteButton(row)}}>삭제</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <StyledTableCell align='center'>총합계</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align='center'>{totalIncome}</StyledTableCell>
            <StyledTableCell align='center'>{totalExpenditure}</StyledTableCell>
            <StyledTableCell align='center'>{money}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <TableCell align='right'>
              <PrintReceipts items={imagePath}/>
              <BasicModal color="modalButton" name="연도변경"><ChangeYear /></BasicModal>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}