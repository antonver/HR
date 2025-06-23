import axios from 'axios';

// Create base axios instance
const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Flag to track Telegram initialization
let telegramInitialized = false;

// Initialize Telegram interceptor for request headers
function initializeTelegramInterceptor() {
    if (telegramInitialized || typeof window === 'undefined') return;

    // Delay to ensure Telegram WebApp API is available
    setTimeout(() => {
        baseInstance.interceptors.request.use((config) => {
            try {
                if (window.Telegram?.WebApp?.initData) {
                    // Add Authorization header with Telegram initData
                    config.headers['Authorization'] = `tma ${window.Telegram.WebApp.initData}`;
                }

                // Add Telegram user headers for POST requests
                if (config.method === 'post' && window.Telegram.WebApp.initDataUnsafe?.user) {
                    const user = window.Telegram.WebApp.initDataUnsafe.user;
                    config.headers['x-telegram-user-id'] = user.id ?? null;
                    config.headers['x-telegram-username'] = user.username ?? null;
                    config.headers['x-telegram-first-name'] = user.first_name ?? null;
                    config.headers['x-telegram-last-name'] = user.last_name ?? null;
                }
            } catch (e) {
                console.error('Error processing Telegram data:', e);
            }
            return config;
        });

        telegramInitialized = true;
    }, 100);
}

// Initialize on page load in browser
if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
        initializeTelegramInterceptor();
    } else {
        window.addEventListener('load', initializeTelegramInterceptor);
    }
}

export default baseInstance;