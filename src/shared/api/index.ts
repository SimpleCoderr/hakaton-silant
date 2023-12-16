import axios from "axios";
import {ILoginData, IQueryData} from "shared/interfaces";

export const API_URL = "http://62.76.228.98:16000/api/v1";

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401
            // &&
            // error.config &&
            // !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<IQueryData<ILoginData>>(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem("accessToken", response.data.resultData.accessToken);
                localStorage.setItem("accessToken", response.data.resultData.refreshToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log("not authorized");
            }
        }
        throw error;
    }
);