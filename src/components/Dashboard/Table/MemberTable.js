import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import BasicModal from '../../BasicModal';
import DeletedMemberTable from './DeletedMemberTable';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: theme.palette.common.white,
    backgroundColor: '#bbdefb',
  },
}));

export default function Orders_member(props) {

  const rows = props.members;
  
  const onClickDeleteButton = (email) => {
    const item = {email}
    props.delete(item);
  }

  // LocalDateTime -> xxxx년 xx월 xx일 변환하는 함수
  function parseDate(date) {
    if (date === null) return null;
    const year =  date.substr(0, 4);
    const month = (date.charAt(5) !== '0') ? date.substr(5, 2) : date.substr(6, 1);
    const day = (date.charAt(8) !== '0') ? date.substr(8,2) : date.substr(9,1);
    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <React.Fragment>
      <Title>멤버관리</Title>
      <Typography variant='h3'>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'><div>이메일</div></TableCell>
            <TableCell align='center'>이름</TableCell>
            <TableCell align='center'>전화번호</TableCell>
            <TableCell align='center'>생년월일</TableCell>
            <TableCell align='center'>가입일</TableCell>
            <TableCell align='center'>직급</TableCell>
            <TableCell align='right'><BasicModal variant="outlined" name="복구"><DeletedMemberTable /></BasicModal></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {rows.map((row) => 
            (row.authority[0].authorityName === 'ROLE_LEADER')
            ?
            (
              <TableRow key={row.id}>
                <StyledTableCell align='center'>{row.email}</StyledTableCell>
                <StyledTableCell align='center'>{row.name}</StyledTableCell>
                <StyledTableCell align='center'>{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align='center'>{row.birth}</StyledTableCell>
                <StyledTableCell align='center'>{parseDate(row.createdAt)}</StyledTableCell>
                <StyledTableCell align='center'>리더</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            )
            :
            (
              <TableRow key={row.id}>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.phoneNumber}</TableCell>
                <TableCell align='center'>{row.birth}</TableCell>
                <TableCell align='center'>{parseDate(row.createdAt)}</TableCell>
                <TableCell align='center'>멤버</TableCell>
                <TableCell align='right'>    
                  <Button variant='outlined' size='small' color='error' onClick={() => {onClickDeleteButton(row.email)}}>삭제</Button>
                </TableCell>
              </TableRow>
            )
           )}
        </TableBody>
      </Table>
      </Typography>
    </React.Fragment>
  );
}