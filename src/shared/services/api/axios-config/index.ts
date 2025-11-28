import axios from "axios";
import { ErrorInterceptor, ResponseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

const api = axios.create({
    baseURL: Environment.API_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});

api.interceptors.response.use(
    (response) => ResponseInterceptor(response),
    (error) => ErrorInterceptor(error)
);

export { api };