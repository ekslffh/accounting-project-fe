import { ArrowUpwardOutlined, DeleteOutline, UploadFileOutlined } from "@mui/icons-material";
import { Grid, IconButton, InputBase, ListItem, ListItemText } from "@mui/material";
import React from "react";

class Department extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true, url: "/leader/" + props.item.name };
        this.delete = props.delete;
        this.update = props.update;
    }
    onClickDetailButton = () => {
        window.location.href = this.state.url;   
    }
    onClick = () => {
        this.delete(this.state.item);
    }
    offReadOnlyMode = () => {
        this.setState({ readOnly: false }, () => {
        });
    }
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true })
            this.update(this.state.item);
        }
    }
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.name = e.target.value;
        this.setState({ item: thisItem });
    }
    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <ListItemText>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <InputBase 
                                inputProps={{ 
                                    "aria-label": "naked",
                                    readOnly: this.state.readOnly, 
                                }}
                                type="text"
                                id={item.id}
                                name={item.id}
                                value={item.name}
                                multiline={true}
                                fullWidth={true}
                                onClick={this.offReadOnlyMode}
                                readOnly={this.state.readOnly}
                                onKeyPress={this.enterKeyEventHandler}
                                onChange={this.editEventHandler}
                            />
                        </Grid>
                        <Grid item xs={1}>
                        <IconButton onClick={this.onClickDetailButton}><ArrowUpwardOutlined /></IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={this.onClick}>
                            <DeleteOutline />
                            </IconButton>
                        </Grid>
                    </Grid>
                </ListItemText>
            </ListItem>
        );
    }
}

export default Department;