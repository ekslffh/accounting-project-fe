import LeaderHistoryTable from "../components/Dashboard/Table/LeaderHistoryTable"
import UserHistoryTable from "../components/Dashboard/Table/UserHistoryTable"

export default function Year() {
    const getMemberHistories = 
    localStorage.getItem("role") === 'USER'
    ?
    <UserHistoryTable />
    :
    <LeaderHistoryTable />

    return (
        <div>helo</div>
    )
}