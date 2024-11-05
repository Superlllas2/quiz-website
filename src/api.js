// src/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://questnest-d5e1b2fbeab1.herokuapp.com",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
