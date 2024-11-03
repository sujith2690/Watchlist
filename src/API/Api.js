import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

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
export const searchQuery = (query) => API.get(`/search/movie?query=${query}&api_key=0ba5df6f236e387ec449e9fc167ed7ef`)

export const videoDetails =(account_id)=>API.get(`/movie/${account_id}`)
// export const Action = () => API.get(`discover/tv?api_key=${API_key}&with_networks=213`)

// curl --request GET \
//      --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=0ba5df6f236e387ec449e9fc167ed7ef'