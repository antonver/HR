import axios from 'axios';

// Создаем базовый экземпляр axios
const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Отложенная инициализация Telegram данных
let telegramInitialized = false;

// Функция, которая запускается только на клиенте после полной загрузки
function initializeTelegramInterceptor() {
    // Проверяем, не выполнялась ли уже инициализация
    if (telegramInitialized) return;

    // Проверяем, что мы на клиенте и доступно Telegram API
    if (typeof window === 'undefined') return;

    // Установка таймаута, чтобы гарантировать, что WebApp API будет доступно
    setTimeout(() => {
        baseInstance.interceptors.request.use((config) => {
            try {
                // Проверяем доступность Telegram WebApp
                if (window.Telegram?.WebApp) {
                    // Добавляем auth header для всех запросов
                    if (window.Telegram.WebApp.initData) {
                        config.headers['Authorization'] = `tma ${window.Telegram.WebApp.initData}`;
                    }

                    // Добавляем x-telegram-* headers только для POST-запросов
                    if (config.method === 'post' && window.Telegram.WebApp.initDataUnsafe?.user) {
                        const user = window.Telegram.WebApp.initDataUnsafe.user;
                        config.headers['x-telegram-user-id'] = user.id || null;
                        config.headers['x-telegram-username'] = user.username || null;
                        config.headers['x-telegram-first-name'] = user.first_name || null;
                        config.headers['x-telegram-last-name'] = user.last_name || null;
                    }
                }
            } catch (e) {
                console.error('Ошибка при обработке данных Telegram:', e);
            }
            return config;
        });

        telegramInitialized = true;
    }, 100);
}

// Если мы в браузере, запускаем инициализацию после загрузки страницы
if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
        initializeTelegramInterceptor();
    } else {
        window.addEventListener('load', initializeTelegramInterceptor);
    }
}

export default baseInstance;