import { API_BASE_URL } from "../config/app-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-type": "application/json",
    });
    if (localStorage.getItem("token")) {
        headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
    } 
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
    .then((response) =>
        response.json().then((json) => {
            if (!response.ok) {
                // response.ok가 true이면 정상적인 응답을 받은 것이고 아니면 에러 응답을 받은 것임
                return Promise.reject(json);
            }
            return json;
        })
    )
    .catch(error => {
        console.log(error);
        if (error.status === 401) {
            logout();
            window.location.href = "/signin"; // redirect
        } 
        else if (error.status === 403) {
            window.location.href = "/access-denied"
        }
        return Promise.reject(error);
    })
}

// 공용 api service

// 전체 부서 목록 가져오기
export function getDepartments() {
    return call("/department/all", "GET", null).then(res => res.data)
}

// 회원가입
export function signUp(member) {
    call("/auth/signup", "POST", member)
    .then(res => {
        window.location.href = "/signin"
    })
    .catch(err =>  console.log(err));
}

// 로그인
export function signIn(member) {
    call("/auth/signin", "POST", member)
    .then(res => {
        const role = res.authority[0].authorityName.substring(5); 
        const department = res.department.name;
        const user = {
            "name": res.name,
            "department": department,
            "role": role
        }
        localStorage.setItem("token", res.token);
        localStorage.setItem("name", res.name);
        localStorage.setItem("role", role);
        localStorage.setItem("department", department);
        // localStorage.setItem("USR_CONFIG", JSON.stringify(user));
        window.location.href = "/" + new Date().getFullYear();
    })
    .catch(res => alert(res.error));
    ;
}

// 로그아웃
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("department");
    window.location.href = "/signin"
}

 // 해당 월이 해당 분기가 맞는지 확인하는 함수
 export function isCorrectQuarter(useDate, quarter) {
    const month = new Date(useDate).getMonth() + 1;
    // 1분기: 1~3, 2분기: 4~6, 3분기: 7~9, 4분기: 10~12 
    if (quarter === 1 && 1 <= month && month <=3) return true;
    else if (quarter === 2 && 4 <= month && month <= 6) return true;
    else if (quarter === 3 && 7 <= month && month <= 9) return true; 
    else if (quarter === 4 && 10 <= month && month <= 12) return true;
    else if (quarter === 0) return true;
    else return false;
  }

// 현재 분기 알려주는 함수
export function getCurrentQuarter() {
    const month = new Date().getMonth() + 1;
    if (month <= 3) return 1;
    else if (month <= 6) return 2;
    else if (month <= 9)  return 3;
    else return 4;
}