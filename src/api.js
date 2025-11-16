// src/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.requiresAuth !== false) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        } else if (config.requiresAuth === false && config.headers?.Authorization) {
            delete config.headers.Authorization;
        }
    }
    return config;
});

export function saveQuizResult(resultData) {
    return apiClient.post('/results', resultData, { requiresAuth: true });
}

export function fetchLeaderboard(limit = 10) {
    return apiClient.get('/leaderboard', {
        params: { limit },
        requiresAuth: false
    });
}

export default apiClient;
