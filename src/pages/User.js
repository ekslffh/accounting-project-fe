import Container from '@mui/material/Container';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MonthlyChart from '../components/Dashboard/MonthlyChart';
import Status from '../components/Dashboard/Status';
import { call, isCorrectQuarter } from '../service/ApiService';
import UserHistoryTable from '../components/Dashboard/Table/UserHistoryTable';
import axios from 'axios';
import { API_BASE_URL } from '../config/app-config';

function DashboardContent() {
  const [categories, setCategories] = React.useState([]);
  const [histories, setHistories] = React.useState([]);
  const [serachHistories, setSearchHistories] = React.useState([]);
  const [receipt, setReceipt] = React.useState(null);

  // 카테고리, 분기로 필터링하는 함수
  function filterHistories(search) {
    if (search.category.id === 0) setSearchHistories(histories.filter(history => isCorrectQuarter(history.useDate, search.quarter)));
    else setSearchHistories(histories.filter(history => (history.category.id === search.category.id && isCorrectQuarter(history.useDate, search.quarter))))
  }

  // 카테고리 가져오기
  const getCategories = () => {
    call("/member/categories", "GET", null)
    .then(res => {
      setCategories(res.data);
    })
  }

  // 수입, 지출 내역 관련 함수
  const getHistories = () => {
    call("/member/histories" + "?year=" + new Date().getFullYear(), "GET", null)
      .then(res => {
      setHistories(res.data);
    });
  };
  
  const addHistory = (item) => {
    var data = new FormData();

    if (receipt != null) {
      for (let i = 0; i < receipt.length; i++) {
        data.append("receipts", receipt[i]);
      }
    }
    data.append("history", new Blob([JSON.stringify(item)], {
      type: "application/json"
    }));
    axios.post(API_BASE_URL + "/history" + "?year=" + new Date().getFullYear(), data, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => 
      setHistories(res.data.data)
    )
    .then(res => alert("내역이 추가되었습니다."))
    .catch(res => console.log(res.data.error))
  };

  const deleteHistory = (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      call("/history" + "?year=" + new Date().getFullYear(), "DELETE", item)
      .then(res => {
        setHistories(res.data);
      })
      .then(res => alert("내역이 삭제되었습니다."))
      .catch(err => console.log(err));
    } else {
      alert("취소되었습니다.")
    }
    
  };

  const deleteReceipt = (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(API_BASE_URL + "/history/receipt" + "?year=" + new Date().getFullYear(), {
        data: item,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
      .then(res => {
        alert("영수증이 삭제되었습니다.");
        setHistories(res.data.data);
      })
      .catch(res => console.log(res.data.error));
    } else {
      alert("취소되었습니다.");
    }
    
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
    axios.put(API_BASE_URL + "/history" + "?year=" + new Date().getFullYear(), data, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(res => {
      alert("내역이 수정되었습니다.")
      setHistories(res.data.data);
    })
    .catch(res => console.log(res.data.error))
  };

  React.useEffect(() => {
    getCategories();
    getHistories();
  }, []);

  React.useEffect(() => {
    setSearchHistories(histories);
  }, [histories])

  return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <MonthlyChart histories={histories} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Status histories={serachHistories} />
                </Paper>
              </Grid>
              {/* History Table */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <UserHistoryTable histories={serachHistories} add={addHistory} setReceipt={setReceipt} deleteReceipt={deleteReceipt} delete={deleteHistory} update={updateHistory} categories={categories} filterHistories={filterHistories} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}