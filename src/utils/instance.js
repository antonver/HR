import axios from 'axios';

// Получаем данные Telegram WebApp API
const getTelegramWebAppData = () => {
    if (window.Telegram && window.Telegram.WebApp) {
        return {
            initData: window.Telegram.WebApp.initData,
            user: window.Telegram.WebApp.initDataUnsafe?.user || {}
        };
    }
    return { initData: '', user: {} };
};

const telegramData = getTelegramWebAppData();

const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `tma ${telegramData.initData}`,
    },
});

// Добавляем interceptor для POST-запросов
baseInstance.interceptors.request.use((config) => {
    if (config.method === 'post') {
        const user = telegramData.user;
        config.headers['x-telegram-user-id'] = user.id || null;
        config.headers['x-telegram-username'] = user.username || null;
        config.headers['x-telegram-first-name'] = user.first_name || null;
        config.headers['x-telegram-last-name'] = user.last_name || null;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default baseInstance;