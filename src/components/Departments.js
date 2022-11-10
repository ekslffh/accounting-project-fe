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
    add = (item, email) => {
        if (item.name.trim() === '') return alert("부서 이름을 입력해주세요.");
        else if (email.trim() === '') return alert("부서장 아이디를 입력해주세요.");
        call("/department?email=" + email.trim(), "POST", item)
        .then(response => {
            this.setState({ items: response.data });
            alert("부서가 추가되었습니다");
        })
        .catch(res => {
            alert(res.error);
        });
    }
    delete = (item) => {
        if (window.confirm("정말 삭제하시겠습니까?")) { 
            call("/department", "DELETE", item)
            .then(response => {
                this.setState({ items: response.data });
                alert("부서가 삭제되었습니다");
            })
            .catch(err => console.log(err));
        }
        else {
            alert("취소되었습니다.");
        }
       
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