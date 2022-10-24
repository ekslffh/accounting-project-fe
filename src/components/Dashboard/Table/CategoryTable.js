import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { Button } from '@mui/material';
import BasicModal from '../../BasicModal';
import AddCategory from '../../AddCategory';
import UpdateCategory from '../../UpdateCategory';

function createData(id, title, description) {
  return { id, title, description };
}

function preventDefault(event) {
  event.preventDefault();
}

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

  return (
    <React.Fragment>
      <Title>카테고리</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>설명</TableCell>
            <TableCell align="right"><BasicModal name="추가"><AddCategory add={props.add} /></BasicModal></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">
                <BasicModal name="수정" color="warning"><UpdateCategory update={props.update} item={row}/></BasicModal>
                <Button size='small' color='error' onClick={() => {onClickDeleteButton(row.id)}}>삭제</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}