import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;
const API_KEY = import.meta.env.VITE_API_KEY;

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

export const searchQuery = (query) => API.get(`/search/movie?query=${query}&api_key=${API_KEY}`)

export const videoDetails =(account_id)=>API.get(`/movie/${account_id}`)

// export const videoPlayApi = (movie_id) => API.get(`/movie/${movie_id}/videos`)
export const videoPlayApi = (movie_id) => API.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`)

