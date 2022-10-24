import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MonthlyChart from '../components/Dashboard/MonthlyChart';
import Status from '../components/Dashboard/Status';
import { call, isCorrectQuarter } from '../service/ApiService';
import UserHistoryTable from '../components/Dashboard/Table/UserHistoryTable';

function DashboardContent() {
  const [categories, setCategories] = React.useState([]);
  const [histories, setHistories] = React.useState([]);
  const [serachHistories, setSearchHistories] = React.useState([]);

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
    call("/member/histories", "GET", null)
      .then(res => {
      setHistories(res.data);
    });
  };
  
  const addHistory = (item) => {
    call("/history", "POST", item).then(res => {
      setHistories(res.data);
    })
    .catch(err => console.log(err));
  };

  const deleteHistory = (item) => {
    call("/history", "DELETE", item).then(res => {
      setHistories(res.data);
    })
    .catch(err => console.log(err));
  };

  const updateHistory = (item) => {
    call("/history", "PUT", item).then(res => {
      setHistories(res.data);
    })
    .catch(err => console.log(err));
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
                  <UserHistoryTable histories={serachHistories} add={addHistory} delete={deleteHistory} update={updateHistory} categories={categories} filterHistories={filterHistories} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}