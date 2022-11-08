import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";

class AddDepart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { name: "" }, email: ""};
        this.add = props.add;
    }
    addItem = () => {
        this.add(this.state.item, this.state.email);
        this.setState({item: {name: ""}, email: ""})
    }
    inputItem = (e) => {
        var thisItem = this.state.item;
        thisItem.name = e.target.value;
        this.setState({item: thisItem})
    }
    inputEmail = (e) => {
        this.setState(({email: e.target.value}));
    }
    enterDown = (e) => {
        if (e.key === 'Enter') {
            this.add(this.state.item, this.state.email);
            this.setState({item: {name: ""}, email: ""})
        }
    }
    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={5} md={5} item style={{ paddingRight: 16 }}>
                        <TextField 
                            placeholder="부서 이름" 
                            fullWidth variant="standard" 
                            onChange={this.inputItem} 
                            onKeyPress={this.enterDown} 
                            value={this.state.item.name} 
                        />
                    </Grid>
                    <Grid xs={5} md={5} item style={{ paddingRight: 16 }}>
                        <TextField 
                            placeholder="부서장 아이디 (초기 비밀번호 1234)" 
                            fullWidth variant="standard" 
                            onChange={this.inputEmail} 
                            onKeyPress={this.enterDown} 
                            value={this.state.email} 
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                    <Button variant="outlined" fullWidth onClick={this.addItem}>
                        추가
                    </Button>
                </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default AddDepart;