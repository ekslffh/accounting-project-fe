let backendHost;

const hostname = window && window.location && window.location.hostname;

// http://localhost:8080
if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
} else {
    backendHost = "https://api.hsap.link";
}

export const API_BASE_URL = `${backendHost}`;