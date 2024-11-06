// src/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://questnest-d5e1b2fbeab1.herokuapp.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
