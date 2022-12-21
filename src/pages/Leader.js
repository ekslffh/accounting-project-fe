import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MonthlyChart from '../components/Dashboard/MonthlyChart';
import Status from '../components/Dashboard/Status';
import MemberTable from '../components/Dashboard/Table/MemberTable';
import CategoryTable from '../components/Dashboard/Table/CategoryTable';
import { call, getCurrentQuarter, isCorrectQuarter } from '../service/ApiService';
import LeaderHistoryTable from '../components/Dashboard/Table/LeaderHistoryTable';
import { API_BASE_URL } from '../config/app-config';
import axios from 'axios';
import "../style/Main.css"
import { BottomNavigation, BottomNavigationAction, Button, TextField } from '@mui/material';

export default function Leader(props) {
  const [department, ] = React.useState({ name: props.match.params.name });
  const [year, ] = React.useState(props.match.params.year);
  const [categories, setCategories] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [histories, setHistories] = React.useState([]);
  const [filteredHistories, setFilteredHistories] = React.useState([]);
  const [receipt, setReceipt] = React.useState(null);
  const historyTab = React.useRef();
  const categoryTab = React.useRef();
  const memberTab = React.useRef();
  const [category, setCategory] = React.useState({id: 0});
  const [member, setMember] = React.useState({id: 0});
  const [quarter, setQuarter] = React.useState(getCurrentQuarter());

  React.useEffect(() => {
    const search = {
      member,
      category,
      quarter
    }
    filterHistories(search)
  }, [category, member, quarter, histories])

  // 카테고리 관련 함수
  const getCategories = () => {
    call("/department/categories?name=" + department.name, "GET", null)
    .then(res => {
      setCategories(res.data);
    })
    .catch(err => console.log(err))
  };
  const addCategory = (item) => {
    if (item.title === '') {
      alert("카테고리명을 입력해주세요.");
      return;
    }
    item.department = { name: department.name };
    call("/category", "POST", item)
    .then(res => {
      setCategories(res.data);
    })
    .then(res => alert("카테고리가 추가되었습니다."))
    .catch(res => alert(res.error));
  };
  const deleteCategory = (item) => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
       item.department = { name: department.name }
       call("/category", "DELETE", item).then(res => {
       setCategories(res.data);
       })
      .then(res =>  alert("카테고리가 삭제되었습니다."))
      .catch(res => alert(res.error));
    }
    else {
      alert("취소되었습니다.")
    }
  }
  const updateCategory = (item) => {
    if (item.title === '') {
      alert("카테고리명을 입력해주세요.");
      return;
    }
    item.department = { name: department.name };
    call("/category", "PUT", item)
    .then(res => {
      setCategories(res.data);
    })
    .then(res => alert("카테고리가 수정되었습니다."))
    .catch(res => alert(res.error));
  }

  // 멤버 관련 함수
  const getMembers = () => {
    call("/department/members?name=" + department.name, "GET", null).then(res => {
      setMembers(res.data);
    })
  }
  const deleteMember = (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
        call("/member", "DELETE", item)
        .then(res => { getMembers();})
        .then(res => alert("멤버가 삭제되었습니다."))
        .catch(res => alert(res.error));
    }
    else {
      alert("취소되었습니다.")
    }
  }
  // 수입, 지출 내역 관련 함수
  const getHistories = () => {
    call("/department/histories?name=" + department.name + "&year=" + year, "GET", null)
    .then(res => {
      setHistories(res.data);
    })
    .catch(err => console.log(err));
  };
  const addHistory = (item) => {
    var data = new FormData();
    
    if (receipt !== null) {
      for (let i = 0; i < receipt.length; i++) {
        data.append("receipts", receipt[i]);
      }
    }
    data.append("history", new Blob([JSON.stringify(item)], {
      type: "application/json"
    }));
    axios.post(API_BASE_URL + "/history/department" + "?year=" + year, data, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(res => {
      setHistories(res.data.data);
      alert("내역이 추가되었습니다.")
    })
    .catch(err => console.log(err));
    ;
  };
  const deleteHistory = (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) { 
      call("/history/department" + "?year=" + year, "DELETE", item)
      .then(res => {
        setHistories(res.data);
        alert("내역이 삭제되었습니다.");
      })
      .catch(err => console.log(err));
    } else {
      alert("취소되었습니다.");
    }
    
  };
  const deleteReceipt = (item) => {
    axios.delete(API_BASE_URL + "/history/receipt/department" + "?year=" + year, {
      data: item,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
    .then(res => {
      setHistories(res.data.data)
      alert("영수증이 삭제되었습니다.")
    })
    .catch(err => console.log(err));
  }
  const updateHistory = (item) => {
    var data = new FormData();
    if (receipt !== null) {
      for (let i = 0; i < receipt.length; i++) {
        data.append("receipts", receipt[i]);
      }
    }
    data.append("history", new Blob([JSON.stringify(item)], {
      type: "application/json"
    }));
    axios.put(API_BASE_URL + "/history/department" + "?year=" + year, data, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(res => {
      setHistories(res.data.data)
      alert("내역이 수정되었습니다.")
    })
    .catch(err => console.log(err));
  };

  // 결제 / 미결제 구분
  const changePaymentOrNot = (item) => {
    call("/history/payment?year=" + year, "PUT", item)
    .then(res => {
      setHistories(res.data);
    })
    .catch(res => {
      console.log(res.error);
    })
  }

  // 카테고리, 분기로 필터링하는 함수
  function filterHistories(search) {
    // 전체 멤버일 때
    if (search.member.id === 0) {
      if (search.category.id === 0) setFilteredHistories(histories.filter(history => isCorrectQuarter(history.useDate, search.quarter)));
      else setFilteredHistories(histories.filter(history => (history.category.id === search.category.id && isCorrectQuarter(history.useDate, search.quarter))))
    }
    // 특정 멤버 내역 가져오기
    else {
      if (search.category.id === 0) setFilteredHistories(histories.filter(history => history.member.id === search.member.id && isCorrectQuarter(history.useDate, search.quarter)));
      else setFilteredHistories(histories.filter(history => (history.member.id === search.member.id && history.category.id === search.category.id && isCorrectQuarter(history.useDate, search.quarter))))
    }
    // 전체 카테고리
  }

  React.useEffect(() => {
    getNotice();
    getCategories();
    getHistories();
    getMembers();
  }, []);

  // 공지
  const [notice, setNotice] = React.useState('');
  const handleNoticeChange = (event) => {
    setNotice(event.target.value);
  }

  const onClickNoticeButton = () => {
    const item = {
      name: department.name,
      notice,
    }
    call("/department/notice", "PUT", item)
    .then(res => {
      setNotice(res.notice);
      alert("공지가 변경되었습니다.")
    })
    .catch(res => console.log(res.error));
  }

  const getNotice = () => {
    call("/department/notice?department=" + department.name, "GET", null)
    .then(res => {
      setNotice(res.notice)
    })
    .catch(res => console.log(res.error));
  }

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
               <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div>
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={9} md={11}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="공지"
                        multiline
                        value={notice === null ? '' : notice}
                        fullWidth
                        onChange={handleNoticeChange}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Button variant='outlined' onClick={onClickNoticeButton}>저장</Button>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <MonthlyChart histories={filteredHistories} year={year} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Status histories={filteredHistories} />
                </Paper>
              </Grid>
              <Grid item xs={12} ref={historyTab}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%',overflow: 'auto' }}>
                  <LeaderHistoryTable category={category} setCategory={setCategory} member={member} setMember={setMember} quarter={quarter} setQuarter={setQuarter} changePaymentOrNot={changePaymentOrNot} histories={filteredHistories} add={addHistory} setReceipt={setReceipt} deleteReceipt={deleteReceipt} delete={deleteHistory} update={updateHistory} categories={categories} filterHistories={filterHistories} members={members} />
                </Paper>
              </Grid>
              <Grid item xs={12} ref={categoryTab}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'auto'  }}>
                  <CategoryTable categories={categories} add={addCategory} delete={deleteCategory} update={updateCategory} department={department} year={year} />
                </Paper>
              </Grid>
              <Grid item xs={12} ref={memberTab}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%',overflow: 'auto' }}>
                  <MemberTable members={members} delete={deleteMember} department={department.name} />
                </Paper>
              </Grid>
            </Grid>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="내역현황" onClick={() => {historyTab.current.scrollIntoView()}}/>
          <BottomNavigationAction label="카테고리" onClick={() => {categoryTab.current.scrollIntoView()}}/>
          <BottomNavigationAction label="멤버관리" onClick={() => {memberTab.current.scrollIntoView()}}/>
        </BottomNavigation>
      </Paper>
          </Container>
  );
}