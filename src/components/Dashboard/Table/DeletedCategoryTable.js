import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { call } from '../../../service/ApiService';

/**
 * 
 * @param {*} props 
 * @returns 카테고리 테이블
 */
export default function DeletedCategoryTable(props) {

  const [categories, setCategories] = React.useState([]);

  // 삭제되었던 카테고리 가져오기
  const getDeletedCategories = (name) => {
    call("/category/deleted?name=" + name, "GET", null) 
    .then(res => {
      setCategories(res.data);
    })
    .catch(res => console.log(res.error));
  }

  const onClickRecoverButton = (id) => {
    call("/category/recover", "PUT", {id})
    .then(res => {
      setCategories(res.data);
      alert("복구가 완료되었습니다.");
      window.location.reload();
    })
    .catch(res => console.log(res.error));
  }

  React.useEffect(() => {
    getDeletedCategories(localStorage.getItem("department"));
  }, [])

  return (
    <React.Fragment>
      {/* <Title>카테고리</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>이름</TableCell>
            <TableCell align='center'>설명</TableCell>
            <TableCell align='center'>금액</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((row) => (
            <TableRow key={row.id}>
              <TableCell align='center'>{row.title}</TableCell>
              <TableCell align='center'>{row.description}</TableCell>
              <TableCell align='center'>{row.amount}</TableCell>
              <TableCell align='center'><Button onClick={() => {onClickRecoverButton(row.id)}}>복구</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}