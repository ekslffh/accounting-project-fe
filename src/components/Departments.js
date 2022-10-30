import { Container, List, Paper } from "@mui/material";
import React from "react";
import AddDepart from "./AddDepart";
import Department from "./Department";
import { call } from "../service/ApiService";

class Departments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount() {
       call("/department/all", "GET", null).then(response => {
        this.setState({ items: response.data });
       })
    }
    add = (item) => {
        call("/department", "POST", item)
        .then(response => {
            this.setState({ items: response.data });
            alert("부서가 추가되었습니다");
        })
        .catch(err => console.log(err));
    }
    delete = (item) => {
        call("/department", "DELETE", item)
        .then(response => {
            this.setState({ items: response.data });
            alert("부서가 삭제되었습니다");
        })
        .catch(err => console.log(err));
    }
    update = (item) => {
        call("/department", "PUT", item)
        .then(response => {
            this.setState({ items: response.data });
            alert("부서가 수정되었습니다");
        })
        .catch(err => console.log(err));
    }
    render() {
        var departmentItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item) => (
                        <Department item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </List>
            </Paper>
        )
        return (
            <div>
                <Container maxWidth="md">
                    <AddDepart add={this.add}/>
                    <div className="departmentList">{departmentItems}</div>
                </Container>
            </div>
        );
    }
}

export default Departments;