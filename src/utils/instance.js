import axios from 'axios';

const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Получаем данные Telegram WebApp API
const getTelegramWebAppData = () => {
    try {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            return {
                initData: window.Telegram.WebApp.initData,
                user: window.Telegram.WebApp.initDataUnsafe?.user || {}
            };
        }
    } catch (e) {
        console.error('Ошибка при получении данных Telegram WebApp:', e);
    }
    return { initData: '', user: {} };
};

// Добавляем interceptor для всех запросов
baseInstance.interceptors.request.use((config) => {
    // Получаем данные только когда нужно делать запрос
    const telegramData = getTelegramWebAppData();

    // Добавляем auth header для всех запросов
    if (telegramData.initData) {
        config.headers['Authorization'] = `tma ${telegramData.initData}`;
    }

    // Добавляем x-telegram-* headers только для POST-запросов
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