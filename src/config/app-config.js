let backendHost;

const hostname = window && window.location && window.location.hostname;

// http://localhost:8080
if (hostname === "localhost") {
    backendHost = "http://prod-hsap-backend.ap-northeast-2.elasticbeanstalk.com";
} else {
    backendHost = "http://prod-hsap-backend.ap-northeast-2.elasticbeanstalk.com";
}

export const API_BASE_URL = `${backendHost}`;