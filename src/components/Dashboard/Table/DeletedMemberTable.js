import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { call } from '../../../service/ApiService';

function preventDefault(event) {
  event.preventDefault();
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function DeletedMemberTable(props) {

  const [members, setMembers] = React.useState([]);

  // LocalDateTime -> xxxx년 xx월 xx일 변환하는 함수
  function parseDate(date) {
    if (date === null) return null;
    const year =  date.substr(0, 4);
    const month = (date.charAt(5) !== '0') ? date.substr(5, 2) : date.substr(6, 1);
    const day = (date.charAt(8) !== '0') ? date.substr(8,2) : date.substr(9,1);
    return `${year}년 ${month}월 ${day}일`;
  }

  const getDeletedMembers = (name) => {
    call("/member/deleted?name=" + name, "GET", null) 
    .then(res => {
      setMembers(res.data);
    })
    .catch(res => console.log(res.error));
  }

  const onClickRecoverButton = (id) => {
    call("/member/recover", "PUT", {id})
    .then(res => {
      setMembers(res.data);
      alert("복구가 완료되었습니다.");
      window.location.reload();
    })
    .catch(res => console.log(res.error));
  }

  React.useEffect(() => {
    getDeletedMembers(localStorage.getItem("department"));
  }, [])

  return (
    <React.Fragment>
      <Title>멤버관리</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>이메일</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>가입일</TableCell>
            <TableCell>직급</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {members.map((row) => 
            (row.authority[0].authorityName === 'ROLE_LEADER')
            ?
            (
              <TableRow key={row.id}>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                <StyledTableCell>{row.birth}</StyledTableCell>
                <StyledTableCell>{parseDate(row.createdAt)}</StyledTableCell>
                <StyledTableCell>리더</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            )
            :
            (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.birth}</TableCell>
                <TableCell>{parseDate(row.createdAt)}</TableCell>
                <TableCell>멤버</TableCell>
                <TableCell align='right'><Button onClick={() => {onClickRecoverButton(row.id)}}>복구</Button></TableCell>
              </TableRow>
            )
           )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}