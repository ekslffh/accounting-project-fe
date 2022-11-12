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
import DeletedCategoryTable from './DeletedCategoryTable';
import { Add } from '@mui/icons-material';

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
            <TableCell>금액</TableCell>
            <TableCell align="right">
              <BasicModal name={<Add />}><AddCategory add={props.add} /></BasicModal>
              <BasicModal variant="outlined" name="복구"><DeletedCategoryTable /></BasicModal>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">
                <BasicModal variant="outlined" name="수정" color="warning"><UpdateCategory update={props.update} item={row}/></BasicModal>
                <Button size='small' variant='outlined' color='error' onClick={() => {onClickDeleteButton(row.id)}}>삭제</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}