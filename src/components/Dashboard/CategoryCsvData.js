import { Button } from "@mui/material";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { call } from "../../service/ApiService";

export default function CategoryCsvData(props) {

    const [sync, setSync] = useState(false)
    const [data, setData] = useState([])

    const headers = [
        { label: "적요", key: "name" },
        { label: "1월", key: "jan" },
        { label: "2월", key: "feb" },
        { label: "3월", key: "mar" },
        { label: "4월", key: "apr" },
        { label: "5월", key: "may" },
        { label: "6월", key: "jun" },
        { label: "7월", key: "jul" },
        { label: "8월", key: "aug" },
        { label: "9월", key: "sep" },
        { label: "10월", key: "oct" },
        { label: "11월", key: "nov" },
        { label: "12월", key: "dec" },
      ];

    let name = "카테고리/월별 차트_" + new Date();

    function createIncomeData(data) {
      return { 
        name: data.categoryDTO.title, 
        jan: data.monthlyIncome[0],
        feb: data.monthlyIncome[1],
        mar: data.monthlyIncome[2],
        apr: data.monthlyIncome[3],
        may: data.monthlyIncome[4],
        jun: data.monthlyIncome[5],
        jul: data.monthlyIncome[6],
        aug: data.monthlyIncome[7],
        sep: data.monthlyIncome[8],
        oct: data.monthlyIncome[9],
        nov: data.monthlyIncome[10],
        dec: data.monthlyIncome[11]
      }
    }

    function createExpenditureData(data) {
        return { 
          name: data.categoryDTO.title, 
          jan: data.monthlyExpenditure[0],
          feb: data.monthlyExpenditure[1],
          mar: data.monthlyExpenditure[2],
          apr: data.monthlyExpenditure[3],
          may: data.monthlyExpenditure[4],
          jun: data.monthlyExpenditure[5],
          jul: data.monthlyExpenditure[6],
          aug: data.monthlyExpenditure[7],
          sep: data.monthlyExpenditure[8],
          oct: data.monthlyExpenditure[9],
          nov: data.monthlyExpenditure[10],
          dec: data.monthlyExpenditure[11]
        }
      }

    const getData = () => {
        call("/department/monthly-chart?name=중고등부&year=" + props.year)
            .then(res => {
              const title1 = [{name: "수입"}];
              const income = (res.data.map(d => createIncomeData(d)));
              const title2 = [{name: "지출"}];
              const expenditure = (res.data.map(d => createExpenditureData(d)));
              const value = title1.concat(income, title2, expenditure);
              setData(value)
              setSync(true)
            })
            .catch(res => console.log(res.error))
        }
    const getExcel = () => setSync(false)

    return (
      sync ?
      <CSVLink filename={name} data={data} headers={headers} target="_blank" onClick={getExcel}>월별차트</CSVLink>
      :
      <Button color="success" variant="outlined" size="small" onClick={getData}>동기화</Button>
    )
}