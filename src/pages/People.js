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
        .catch(res => {
            console.log(res.error)
        })
    }
    const updateMember = (item) => {
        call("/people", "PUT", item)
        .then(res => {
            setMembers(res.data)
        })
        .catch(res => {
            console.log(res.error)
        })
    }
    const deleteMember = (item) => {
        item.department = {name: department.name}
        call("/people", "DELETE", item)
        .then(res => {
            setMembers(res.data)
        })
        .catch(res => {
            console.log(res.error)
        })
    }
    React.useEffect(() => {
        getMembers();
    }, [])
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
                    <AllMembersTable department={department} members={members} addMember={addMember} updateMember={updateMember} deleteMember={deleteMember} />
                </Paper>
           </Grid> 
        </Grid>
        </Container>
    )
}