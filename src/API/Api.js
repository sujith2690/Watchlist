import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;
const API_LANGUAGE = import.meta.env.VITE_API_LANGUAGE;
const API_PAGE = import.meta.env.VITE_API_PAGE;

const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        accept: 'application/json',
    }
})

API.interceptors.request.use((req) => {
    if (API_BEARER_TOKEN) {
        req.headers.Authorization = `Bearer ${API_BEARER_TOKEN}`;
    }
    return req;
});

export const BannerApi = () => API.get(`/movie/popular?language=en-US&page=1`)