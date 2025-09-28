import axios from 'axios';
import { EXPO_BACKEND } from '@env';
console.log('Backend URL:', EXPO_BACKEND);
const api = axios.create({
    baseURL: EXPO_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

export default api;
