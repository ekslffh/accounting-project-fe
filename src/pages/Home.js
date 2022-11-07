import React from "react";
import NotFound from "./NotFound";

export default function Home(props) {
    const [year, ] = React.useState(props.match.params.year);
    if (isNaN(year)) return window.location.href = "/"
    const role = localStorage.getItem("role");
    const department = localStorage.getItem("department");
    if (role === "USER") window.location.href = "/user/" + year;
    else if (role === "LEADER") window.location.href = "/leader/" + department + "/" + year;
    else if (role === "ADMIN") window.location.href = "/admin";
    else window.location.href = "/signin";
    
}