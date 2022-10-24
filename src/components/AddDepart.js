import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";

class AddDepart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { name: "" } };
        this.add = props.add;
    }
    addItem = () => {
        this.add(this.state.item);
        this.setState({item: {name: ""}})
    }
    inputItem = (e) => {
        var thisItem = this.state.item;
        thisItem.name = e.target.value;
        this.setState({item: thisItem})
    }
    enterDown = (e) => {
        if (e.key === 'Enter') {
            this.add(this.state.item);
            this.setState({item: {name: ""}})
        }
    }
    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField 
                            placeholder="부서 추가" 
                            fullWidth variant="standard" 
                            onChange={this.inputItem} 
                            onKeyPress={this.enterDown} 
                            value={this.state.item.name} 
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