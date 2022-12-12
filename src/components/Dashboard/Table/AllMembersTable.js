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
import AddCategory from '../../AddCategory';
import AddMember from '../../AddMember';
import UpdateMember from '../../\bUpdateMember';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    // color: theme.palette.common.white,
    backgroundColor: '#bbdefb',
  },
}));

export default function AllMembersTable(props) {

  const rows = props.members;
  const department = props.department;
  
  const onClickDeleteButton = (id) => {
    const item = {id}
    props.deleteMember(item);
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
      <Title>{department.name} 전체멤버 관리</Title>
      <Typography variant='h3'>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>이름</TableCell>
            <TableCell align='center'>성별</TableCell>
            <TableCell align='center'>전화번호</TableCell>
            <TableCell align='center'>생년월일</TableCell>
            <TableCell align='center'>상태</TableCell>
            <TableCell align='center'>메모</TableCell>
            <TableCell align='right'><BasicModal variant="outlined" name="추가"><AddMember addMember={props.addMember} /></BasicModal></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {rows.map((row) =>  
           (
              <TableRow key={row.id}>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.gender === 'MALE' ? '남' : '여'}</TableCell>
                <TableCell align='center'>{row.phoneNumber}</TableCell>
                <TableCell align='center'>{row.birth}</TableCell>
                <TableCell align='center'>{row.status}</TableCell>
                <TableCell align='center'>{row.memo}</TableCell>
                <TableCell align='right'>    
                  <BasicModal variant="outlined" name="수정" color="warning"><UpdateMember item={row} updateMember={props.updateMember}/></BasicModal>
                  <Button variant='outlined' size='small' color='error' onClick={() => {onClickDeleteButton(row.id)}}>삭제</Button>
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