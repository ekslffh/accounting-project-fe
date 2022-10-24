import React from "react";
import Departments from "./Departments";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department: {id: 0, name: "청년부", asset: 0},
        }
    }
    render() {
        return (
            <div>
                <Departments />
            </div>
        )
    }
}

export default Admin;