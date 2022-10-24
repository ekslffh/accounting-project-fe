export default function Home() {
    const role = localStorage.getItem("role");
    const department = localStorage.getItem("department");
    if (role === "USER") window.location.href = "/user";
    else if (role === "LEADER") window.location.href = "/leader/" + department;
    else if (role === "ADMIN") window.location.href = "/admin";
    else window.location.href = "/signin";
}