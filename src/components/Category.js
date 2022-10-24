import { DeleteOutline } from "@mui/icons-material";
import { Grid, Icon, IconButton, InputBase, ListItem, ListItemText } from "@mui/material";

import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
        this.update = props.update;
    }
    componentDidMount() {
        console.log(this.state.item)
    }
    onClick = () => {
        this.delete(this.state.item);
    }
    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly)
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly? ", this.state.readOnly)
        });
    }
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true })
            this.update(this.state.item);
        }
    }
    editTitleHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }
    editDescHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.description = e.target.value;
        this.setState({ item: thisItem })
    }
    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <ListItemText>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InputBase 
                                inputProps={{ 
                                    "aria-label": "naked",
                                    readOnly: this.state.readOnly, 
                                }}
                                type="text"
                                id={item.id}
                                name={item.id}
                                value={item.title}
                                multiline={true}
                                fullWidth={true}
                                onClick={this.offReadOnlyMode}
                                readOnly={this.state.readOnly}
                                onKeyPress={this.enterKeyEventHandler}
                                onChange={this.editTitleHandler}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <InputBase 
                                inputProps={{ 
                                    "aria-label": "naked",
                                    readOnly: this.state.readOnly, 
                                }}
                                type="text"
                                id={item.id}
                                name={item.id}
                                value={item.description}
                                multiline={true}
                                fullWidth={true}
                                onClick={this.offReadOnlyMode}
                                readOnly={this.state.readOnly}
                                onKeyPress={this.enterKeyEventHandler}
                                onChange={this.editDescHandler}
                            />
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

export default Category;