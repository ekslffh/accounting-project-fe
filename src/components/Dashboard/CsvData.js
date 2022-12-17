import { CSVLink } from "react-csv";

export default function CsvData(props) {

    const headers = [
        { label: "사용일", key: "useDate" },
        { label: "적요", key: "category" },
        { label: "수입", key: "income" },
        { label: "지출", key: "expenditure" },
        { label: "잔액", key: "balance" },
        { label: "비고", key: "memo" },
      ];

      let balance = 0;
      let name = "사용내역_" + new Date();

      function parseDate(useDate) {
        const date = new Date(useDate);
        date.toString();
        const year = date.getFullYear().toString().substring(2);
        const month = ((date.getMonth() + 1).toString().length === 1) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString(); 
        const day = (date.getDate().toString().length === 1) ? '0' + date.getDate().toString() : date.getDate().toString();
        return year + month + day;
      }

      function createData(data) {
        balance = balance + data.income - data.expenditure;
        return { useDate: parseDate(data.useDate), category: data.category.title, income: data.income, expenditure: data.expenditure, memo: data.memo, balance: balance}
      }

      const data = props.data.map(d => createData(d));
      data.push({category: "누계", income: props.totalIncome, expenditure: props.totalExpenditure, balance: props.totalIncome - props.totalExpenditure})

    return <CSVLink filename={name} data={data} headers={headers}>EXCEL</CSVLink>;
}