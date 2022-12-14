import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { Button, Typography } from '@mui/material';
import BasicModal from '../../BasicModal';
import AddMember from '../../AddMember';
import UpdateMember from '../../\bUpdateMember';

export default function AllMembersTable(props) {

  const rows = props.members;
  const department = props.department;
  
  const onClickDeleteButton = (id) => {
    const item = {id}
    props.deleteMember(item);
  }

  const parseStatus = (status) => {
    if (status === "ACTIVE") return "활성화"
    else if (status === "JOURNEY") return "영적여정"
    else if (status === "SPECIAL") return "특수상황"
    else if (status === "INACTIVE") return "비활성화"
    else return "NONE"
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
                <TableCell align='center'>{parseStatus(row.status)}</TableCell>
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