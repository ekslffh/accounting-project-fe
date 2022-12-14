import React from "react";

export default function Home(props) {
    const [year, setYear] = React.useState(props.match.params.year);
    if (year !== undefined && isNaN(year)) return window.location.href = "/"
    const role = localStorage.getItem("role");
    const department = localStorage.getItem("department");
    if (year === undefined) setYear(new Date().getFullYear()); 
    if (role === "USER") window.location.href = "/user/" + year;
    else if (role === "LEADER") window.location.href = "/leader/" + department + "/" + year;
    else if (role === "ADMIN") window.location.href = "/admin";
    else window.location.href = "/signin";
    
}