import axios from 'axios';

const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let telegramInitialized = false;

function initializeTelegramInterceptor() {
    if (telegramInitialized || typeof window === 'undefined') return;

    setTimeout(() => {
        baseInstance.interceptors.request.use((config) => {
            try {
                if (window.Telegram?.WebApp?.initData) {
                    config.headers['Authorization'] = `tma ${window.Telegram.WebApp.initData}`;
                }

                if (config.method === 'post' && window.Telegram.WebApp.initDataUnsafe?.user) {
                    const user = window.Telegram.WebApp.initDataUnsafe.user;
                    config.headers['x-telegram-user-id'] = user.id ?? null;
                    config.headers['x-telegram-username'] = user.username ?? null;
                    config.headers['x-telegram-first-name'] = user.first_name ?? null;
                    config.headers['x-telegram-last-name'] = user.last_name ?? null;
                }
            } catch (e) {
                console.error('Ошибка при обработке данных Telegram:', e);
            }
            return config;
        });

        telegramInitialized = true;
    }, 100);
}

if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
        initializeTelegramInterceptor();
    } else {
        window.addEventListener('load', initializeTelegramInterceptor);
    }
}

export default baseInstance;