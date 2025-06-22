import axios from 'axios';
import { retrieveRawInitData } from '@telegram-apps/sdk'

const initDataRaw = retrieveRawInitData()

const baseInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `tma ${initDataRaw}`
    },
});

export default baseInstance;
