// src/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://quest-nest-backend-a0171c77d032.herokuapp.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
