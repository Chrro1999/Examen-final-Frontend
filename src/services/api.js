import axios from 'axios';

const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export const getApiErrorMessage = (error) => {
    const data = error.response?.data;

    if (typeof data === 'string') {
        return data;
    }

    if (data && typeof data === 'object') {
        return Object.entries(data)
            .map(([field, messages]) => {
                const detail = Array.isArray(messages)
                    ? messages.join(', ')
                    : typeof messages === 'string'
                        ? messages
                        : JSON.stringify(messages);
                return `${field}: ${detail}`;
            })
            .join(' | ');
    }

    return error.message || 'No se pudo conectar con el servidor.';
};

export default api;
