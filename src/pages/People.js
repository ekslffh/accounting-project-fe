import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import AllMembersTable from "../components/Dashboard/Table/AllMembersTable";
import { call } from "../service/ApiService";

export default function People(props) {
    const [department, ] = React.useState({ name: props.match.params.name });
    const [members, setMembers] = React.useState([])

    const getMembers = () => {
        call("/department/peoples?name=" + department.name, "GET", null)
        .then(res => {
            setMembers(res.data)
        })
        .catch(res => {
            console.log(res.error)
        })
    }
    const addMember = (item) => {
        call("/people", "POST", item)
        .then(res => {
            setMembers(res.data)
        })
        .then(res => alert("멤버가 추가되었습니다."))
        .catch(res => {
            console.log(res.error)
        })
    }
    const updateMember = (item) => {
        call("/people", "PUT", item)
        .then(res => {
            setMembers(res.data)
        })
        .then(res => alert("멤버가 수정되었습니다."))
        .catch(res => {
            console.log(res.error)
        })
    }
    const deleteMember = (item) => {
        item.department = {name: department.name}
        if (window.confirm("정말 삭제하시겠습니까?")) {
        call("/people", "DELETE", item)
        .then(res => {
            setMembers(res.data)
        })
        .then(res => alert("멤버가 삭제되었습니다."))
        .catch(res => {
            console.log(res.error)
        })
        } else {
            alert("취소되었습니다.")
        }
    }
    React.useEffect(() => {
        getMembers();
    }, [])
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
           <Grid item xs={12}>
                <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%',overflow: 'auto' }}
                >
                    <AllMembersTable department={department} members={members} addMember={addMember} updateMember={updateMember} deleteMember={deleteMember} />
                </Paper>
           </Grid> 
        </Grid>
        </Container>
    )
}