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
import { Addchart, Clear, PanoramaFishEyeRounded, ReceiptLong } from '@mui/icons-material';
import BasicImageList from '../../BasicImageList';
import ChangeYear from '../../ChangeYear';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: theme.palette.common.white,
    backgroundColor: '#bbdefb',
  },
}));

export default function UserHistoryTable(props) {
  const [category, setCategory] = React.useState({id: ''});
  const [quarter, setQuarter] = React.useState('');
  // 검색필터 기준 (카테고리, 분기)
  const [search, setSearch] = React.useState({
    category: {id: 0},
    quarter: 0,
  })
  // 잔액
  let money = 0;
  const rows = props.histories;
  const categories = props.categories;

  const handleCategoryChange = (event) => {
    setCategory({id: event.target.value});
    setSearch((preSearch) => ({...preSearch, category: {id: event.target.value}}));
  };
  const handleTimeChange = (event) => {
    setQuarter(event.target.value);
    setSearch((preSearch) => ({...preSearch, quarter: event.target.value}));
  };
  const onClickDeleteButton = (row) => {
    const item = {
      id: row.id,
      imagePath: row.imagePath
    }
    props.delete(item);
    initializeSearch();
  }
  
  // 수입, 지출 별 합 구하기
  const totalIncome = rows.map(row => row.income).reduce((prev, cur) => prev + cur, 0);
  const totalExpenditure = rows.map(row => row.expenditure).reduce((prev, cur) => prev + cur, 0);

   // 사용일 기준 오름차순
   rows.sort(function(a, b) {
    var keyA = new Date(a.useDate), keyB = new Date(b.useDate);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  })

  function initializeSearch() {
    setCategory({id : ''})
    setQuarter('');
  }

  function parseDate(date) {
    const year =  date.substr(2,2);
    const month = (date.charAt(5) !== '0') ? date.substr(5, 2) : date.substr(6, 1);
    const day = date.substr(8,2);
    return `${year}${month}${day}`;
  }

  // 수입이면 더하고 지출이면 빼서 잔액 구하기
  function calcMoney(income, expenditure) {
    if (income !== 0) money += income;
    else money -= expenditure;
    return money;
  }

  React.useEffect(() => {
    props.filterHistories(search);
  }, [search]);

  return (
    <React.Fragment>
      <Grid 
        container 
        // spacing={1} 
        direction="row"
        alignItems="center"
      >
        <Grid item xs={3}>
        <Title>사용현황</Title>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category.id}
            label="category"
            onChange={handleCategoryChange}
          >
            {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
            <MenuItem value={0}>전체</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={3.5}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">분기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quarter}
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
        <Grid item xs={1.5}>
          <BasicModal name={<Addchart fontSize='large'/>}>
            <AddHistory add={props.add} setReceipt={props.setReceipt} categories={categories} initializeSearch={initializeSearch} />
          </BasicModal>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>사용일</TableCell>
            <TableCell align='center'>적요</TableCell>
            <TableCell align='center'>수입</TableCell>
            <TableCell align='center'>지출</TableCell>
            <TableCell align='center'>잔액</TableCell>
            <TableCell align='center'>비고</TableCell>
            <TableCell align='center'>영수증</TableCell>
            <TableCell align='center'>결제여부</TableCell>
            <TableCell>
              <BasicModal name="연도변경" color='modalButton'><ChangeYear /></BasicModal>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align='center'>{parseDate(row.useDate)}</TableCell>
              <TableCell align='center'>{row.category.title}</TableCell>
              <TableCell align='center'>{row.income}</TableCell>
              <TableCell align='center'>{row.expenditure}</TableCell>
              <TableCell align='center'>{calcMoney(row.income, row.expenditure)}</TableCell>
              <TableCell align='center'>{row.memo}</TableCell>
              <TableCell align='center'>
                {(row.imagePath.length !== 0) 
                && 
                <BasicModal name={<ReceiptLong />}><BasicImageList items={row.imagePath} /></BasicModal>}
              </TableCell>
              <TableCell align='center'>{(row.payment) ? <PanoramaFishEyeRounded /> : <Clear />}</TableCell>
              <TableCell>
                <BasicModal variant="outlined" name="수정" color="warning"><UpdateHistory deleteReceipt={props.deleteReceipt} setReceipt={props.setReceipt} imagePath={row.imagePath} categories={categories} item={row} update={props.update} initializeSearch={initializeSearch} /></BasicModal>
                <Button variant='outlined' size='small' color='error' onClick={() => {onClickDeleteButton(row)}}>삭제</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <StyledTableCell align='center'>총합계</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align='center'>{totalIncome}</StyledTableCell>
            <StyledTableCell align='center'>{totalExpenditure}</StyledTableCell>
            <StyledTableCell align='center'>{money}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}