import axios from 'axios';
import { apiUrl } from './config';
import { createErrorNotify } from '@/helpers/functions/Toasts/toastsNotifications';


const apiURL = apiUrl;


const api = axios.create({
    baseURL: apiURL,
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})


api.interceptors.response.use((config)=>{
    return config;
}, async (error)=>{
    const originalRequest = error.config;
    if(error.response?.status === 401 && error?.config && !error?.config._isRetry){
        originalRequest._isRetry=true;
        try{
            const response = await axios.get(`${apiURL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return api.request(originalRequest);
        }catch(e){
            window.location.href = "/"
            createErrorNotify("Вы должны войти в аккаунт повторно")
        }
        
    }
    throw error;
})

export default api;