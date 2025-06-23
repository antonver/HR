import axios from 'axios';
import { retrieveRawInitData, parseInitData } from '@telegram-apps/sdk';

const initDataRaw = retrieveRawInitData();
const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `tma ${initDataRaw}`,
    },
});

// Добавляем interceptor для POST-запросов
baseInstance.interceptors.request.use((config) => {
    if (config.method === 'post') {
        const initData = parseInitData();
        config.headers['x-telegram-user-id'] = initData.user?.id || null;
        config.headers['x-telegram-username'] = initData.user?.username || null;
        config.headers['x-telegram-first-name'] = initData.user?.first_name || null;
        config.headers['x-telegram-last-name'] = initData.user?.last_name || null;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default baseInstance;