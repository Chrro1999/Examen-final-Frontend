import api from './api';

const DIRECTORS_ENDPOINT = '/directors/';

export const getAllDirectors = async () => {
    try {
        const response = await api.get(DIRECTORS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error fetching directors:', error);
        throw error;
    }
};

export const getDirectorById = async (id) => {
    try {
        const response = await api.get(`${DIRECTORS_ENDPOINT}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching director ${id}:`, error);
        throw error;
    }
};

export const createDirector = async (directorData) => {
    try {
        console.log('Creating director with data:', directorData);
        
        // Obtener token CSRF primero
        let csrfToken = await getCsrfToken();
        
        const response = await api.post(DIRECTORS_ENDPOINT, directorData, {
            headers: csrfToken ? {
                'X-CSRFToken': csrfToken
            } : {}
        });
        
        console.log('Director created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating director:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });
        throw error;
    }
};  

export const updateDirector = async (id, directorData) => {
    try {
        console.log(`Updating director ${id} with data:`, directorData);
        
        // Obtener token CSRF primero
        let csrfToken = await getCsrfToken();
        
        const response = await api.put(`${DIRECTORS_ENDPOINT}${id}/`, directorData, {
            headers: csrfToken ? {
                'X-CSRFToken': csrfToken
            } : {}
        });
        
        return response.data;
    } catch (error) {
        console.error(`Error updating director ${id}:`, error);
        throw error;
    }
};

export const patchDirector = async (id, directorData) => {
    try {
        // Obtener token CSRF primero
        let csrfToken = await getCsrfToken();
        
        const response = await api.patch(`${DIRECTORS_ENDPOINT}${id}/`, directorData, {
            headers: csrfToken ? {
                'X-CSRFToken': csrfToken
            } : {}
        });
        return response.data;
    } catch (error) {
        console.error(`Error patching director ${id}:`, error);
        throw error;
    }
};

// CORREGIDO: delete en lugar de delelete
export const deleteDirector = async (id) => {
    try {
        // Obtener token CSRF primero
        let csrfToken = await getCsrfToken();
        
        const response = await api.delete(`${DIRECTORS_ENDPOINT}${id}/`, {
            headers: csrfToken ? {
                'X-CSRFToken': csrfToken
            } : {}
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting director ${id}:`, error);
        throw error;
    }
};

export const getDirectorMovies = async (id) => {
    try {
        const response = await api.get(`${DIRECTORS_ENDPOINT}${id}/movies/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movies for director ${id}:`, error);
        throw error;
    }
};

export const searchDirectors = async (searchTerm) => {
    try {
        const response = await api.get(DIRECTORS_ENDPOINT, {
            params: { search: searchTerm }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching directors:', error);
        throw error;
    }
};

// Función para obtener token CSRF
const getCsrfToken = async () => {
    try {
        // Django generalmente establece el token CSRF en una cookie
        // Podemos leerlo de la cookie
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        
        if (cookieValue) {
            console.log('CSRF token found in cookie');
            return cookieValue;
        }
        
        // Si no hay cookie, intentar obtenerlo del endpoint
        const response = await api.get('/csrf_token/', {
            baseURL: 'http://127.0.0.1:8000'  // URL completa temporal
        });
        
        return response.data.csrfToken;
    } catch (error) {
        console.warn('Could not get CSRF token:', error.message);
        return null;
    }
};